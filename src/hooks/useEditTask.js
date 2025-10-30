import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { toast } from "sonner";
import { logger } from "../utils/logger";

export function useEditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, editTask } = useTasks();

  const existingTask = tasks.find((t) => t._id === id);
  const [title, setTitle] = useState(existingTask?.title || "");
  const [description, setDescription] = useState(
    existingTask?.description || ""
  );

  useEffect(() => {
    if (!existingTask) {
      logger.warn("Task not found in context", { id });
      toast.error("Task not found", {
        description: "Redirecting to home...",
        duration: 2500,
      });
      navigate("/");
    }
  }, [existingTask, id, navigate]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!title.trim() && !description.trim()) {
        toast.error("Cannot save empty task", {
          description: "Please enter a title or description.",
        });
        return;
      }

      try {
        await editTask(id, { title, description });
        toast.success("Task updated successfully!", {
          description: "Your changes have been saved.",
          duration: 2500,
        });
        logger.success("Task updated", { id, title, description });
        navigate("/");
      } catch (error) {
        logger.error("Task update failed", error);
        toast.error("Failed to update task", {
          description: "Something went wrong. Try again later.",
        });
      }
    },
    [id, title, description, editTask, navigate]
  );

  return {
    title,
    description,
    setTitle,
    setDescription,
    handleSubmit,
  };
}
