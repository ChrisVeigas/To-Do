import { useCallback } from "react";
import { toast } from "sonner";
import { logger } from "../utils/logger";

export function useTaskAPI({ token, setTasks, setLoading }) {
  const BASE_URL = "http://localhost:5000/api/tasks";

  const notify = useCallback((message, type = "info", description = "") => {
    switch (type) {
      case "success":
        toast.success(message, { description, duration: 2500 });
        break;
      case "error":
      case "destructive":
        toast.error(message, { description, duration: 3000 });
        break;
      default:
        toast(message, { description, duration: 2500 });
    }
  }, []);

  const fetchTasks = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await fetch(BASE_URL, {
        headers: { "x-auth-token": token },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setTasks(data);

      notify("Tasks loaded successfully", "success");
      logger.info("Fetched all tasks", { count: data.length });
    } catch (err) {
      notify("Failed to fetch tasks", "error");
      logger.error("Error fetching tasks", err);
    } finally {
      setLoading(false);
    }
  }, [token, setTasks, setLoading, notify]);

  const addTask = useCallback(
    async (task) => {
      try {
        setLoading(true);
        const res = await fetch(BASE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify(task),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        setTasks((prev) => [...prev, data]);

        notify("Task added", "success", "Your new task was successfully created.");
        logger.info("Task added successfully", { task });
      } catch (err) {
        notify("Failed to add task", "error");
        logger.error("Add task failed", err);
      } finally {
        setLoading(false);
      }
    },
    [token, setTasks, setLoading, notify]
  );

  const editTask = useCallback(
    async (id, updates) => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/${id}/edit`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify(updates),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const updated = await res.json();
        setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));

        notify("Task updated", "success", "Your task changes were saved.");
        logger.info("Task updated successfully", { id, updates });
      } catch (err) {
        notify("Failed to update task", "error");
        logger.error("Edit task failed", err);
      } finally {
        setLoading(false);
      }
    },
    [token, setTasks, setLoading, notify]
  );

  const deleteTask = useCallback(
    async (taskId) => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/${taskId}`, {
          method: "DELETE",
          headers: { "x-auth-token": token },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        setTasks((prev) => prev.filter((t) => t._id !== taskId));

        notify("Task deleted", "success", "Your task was successfully removed.");
        logger.info("Task deleted successfully", { taskId });
      } catch (err) {
        notify("Failed to delete task", "error");
        logger.error("Delete task failed", err);
      } finally {
        setLoading(false);
      }
    },
    [token, setTasks, setLoading, notify]
  );

  return { fetchTasks, addTask, editTask, deleteTask };
}
