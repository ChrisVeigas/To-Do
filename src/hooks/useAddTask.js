import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { toast } from "sonner";
import { logger } from "../utils/logger";

export function useAddTask() {
  const { addTask, tasks } = useTasks();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    const { title, description } = data;

    const duplicate = tasks.some(
      (task) => task.title.trim().toLowerCase() === title.trim().toLowerCase()
    );

    if (duplicate) {
      const confirmAdd = window.confirm(
        "A task with this title already exists. Do you still want to add it?"
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

      reset(); 
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
    register,
    handleSubmit,
    onSubmit,
    formState,
  };
}
