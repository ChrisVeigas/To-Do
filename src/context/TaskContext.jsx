/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";
import { Snackbar, Alert } from "@mui/material";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const { token } = useUser();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    if (!token) return;

    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/tasks", {
          headers: { "x-auth-token": token },
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      } finally {
        setLoading(false); 
      }
    };

    fetchTasks();
  }, [token]);

  const addTask = async (task) => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(task),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();

      setTasks((prevTasks) => [...prevTasks, data]);
      showAlert("Task added successfully!", "success");
    } catch (err) {
      console.error("Failed to add task", err);
      showAlert("Failed to add task", "error");
    } finally {
      setLoading(false); 
    }
  };

  const updateTask = async (id, progress) => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(progress),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const updatedTask = await res.json();
      setTasks((prev) => prev.map((t) => (t._id === id ? updatedTask : t)));
    } catch (err) {
      console.error("Failed to update task", err);
    } finally {
      setLoading(false);
    }
  };

  const editTask = async (id, updates) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/tasks/${id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(updates),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP error! status: ${res.status} - ${text}`);
      }

      const updatedTask = await res.json();
      setTasks((prev) => prev.map((t) => (t._id === id ? updatedTask : t)));
      showAlert("Task edited successfully!", "success");
    } catch (err) {
      console.error("Failed to edit task", err);
      showAlert("Failed to edit task", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: { "x-auth-token": token },
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      setTasks((prev) => prev.filter((t) => t._id !== taskId));
      showAlert("Task deleted successfully!", "success");
    } catch (err) {
      console.error("Failed to delete task", err);
      showAlert("Failed to delete task", "error");
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, severity = "info") => {
    setAlert({ open: true, message, severity });
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        loading, 
        addTask,
        updateTask,
        editTask,
        deleteTask,
      }}
    >
      {children}

      <Snackbar
        open={alert.open}
        autoHideDuration={2500}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
