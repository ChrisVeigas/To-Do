import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { toast } from "sonner";
import { logger } from "../utils/logger";

export function useAddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { tasks, addTask } = useTasks();
  const navigate = useNavigate();
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      toast.error("Task title required", {
        description: "Please enter a title before adding a task.",
        duration: 3000,
        position: "top-right",
      });
      return;
    }

    const duplicate = tasks.some(
      (task) => task.title.trim().toLowerCase() === title.trim().toLowerCase()
    );

    if (duplicate) {
      const confirmAdd = window.confirm(
        "You already have a task with this title. Do you still want to add it?"
      );
      if (!confirmAdd) {
        toast.warning("Task not added", {
          description: "Duplicate task title detected.",
          duration: 3000,
          position: "top-right",
        });
        return;
      }
    }

    try {
      await addTask({ title, description });
      toast.success("Task added successfully!", {
        description: "Your new task has been created.",
        duration: 2500,
        position: "top-right",
      });
      logger.info("Task added successfully", { title });

      setTitle("");
      setDescription("");
      navigate("/");
    } catch (error) {
      toast.error("Failed to add task", {
        description:
          error.response?.data?.message ||
          "Something went wrong while adding your task.",
        duration: 3000,
        position: "top-right",
      });
      logger.error("Task creation failed", error);
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    titleRef,
    handleSubmit,
  };
}
