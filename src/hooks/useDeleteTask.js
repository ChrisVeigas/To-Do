import { useTasks } from "../context/TaskContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { logger } from "../utils/logger";

export function useDeleteTask() {
  const { setTasks } = useTasks();
  const [loading, setLoading] = useState(false);

  const deleteTask = async (taskId) => {
    setLoading(true);

    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });

      setTasks((prev) => prev.filter((t) => t._id !== taskId));

      toast.success("Task deleted!", {
        description: "Your task has been successfully removed.",
        duration: 2500,
        position: "top-right",
      });

      logger.info("Task deleted successfully", { taskId });
    } catch (error) {
      toast.error("Failed to delete task", {
        description:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        duration: 3000,
        position: "top-right",
      });

      logger.error("Task deletion failed", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAllTasks = async () => {
    setLoading(true);
    try {
      await axios.delete("http://localhost:5000/api/tasks", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });

      setTasks([]);

      toast.success("All tasks deleted!");
      logger.info("All tasks deleted successfully");
    } catch (error) {
      toast.error("Failed to delete all tasks");
      logger.error("All tasks deletion failed", error);
    } finally {
      setLoading(false);
    }
  };

  return { deleteTask, loading, deleteAllTasks };
}
