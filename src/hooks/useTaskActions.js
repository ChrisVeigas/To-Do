import { useTasks } from "../context/TaskContext";
import { useState } from "react";
import { toast } from "sonner";
import { logger } from "../utils/logger";
import axios from "axios";

export function useTaskActions() {
  const { tasks, setTasks } = useTasks();
  const [loading, setLoading] = useState(false);

  const updateTask = async (taskId, updates) => {
    setLoading(true);
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/tasks/${taskId}`,
        updates,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      const updatedTask = res.data;
      setTasks((prev) => prev.map((t) => (t._id === taskId ? updatedTask : t)));

      toast.success("Task updated", {
        description: "Your task details were successfully saved.",
        duration: 2000,
      });

      logger.info("Task updated successfully", { taskId, updates });
    } catch (error) {
      toast.error("Update failed", {
        description: "Could not update the task. Please try again.",
        duration: 3000,
      });

      logger.error("Failed to update task", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });

      setTasks((prev) => prev.filter((t) => t._id !== taskId));

      toast.success("Task deleted", {
        description: "Your task was successfully removed.",
        duration: 2500,
      });

      logger.info("Task deleted successfully", { taskId });
    } catch (error) {
      toast.error("Delete failed", {
        description: "Could not delete the task. Please try again.",
        duration: 3000,
      });

      logger.error("Failed to delete task", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    setTasks,
    updateTask,
    deleteTask,
    loading,
  };
}
