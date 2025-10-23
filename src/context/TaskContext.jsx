/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const { token } = useUser();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:5000/api/tasks", {
      headers: { "x-auth-token": token },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => console.error("Failed to fetch tasks", err));
  }, [token]);

  const addTask = async (task) => {
    try {
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
      console.log("Fetched tasks:", data);

      setTasks((prevTasks) => [...prevTasks, data]);
    } catch (err) {
      console.error("Failed to add task", err);
    }
  };

  const updateTask = async (id, progress) => {
    try {
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
      console.log("Fetched tasks:", updatedTask);

      setTasks((prev) => prev.map((t) => (t._id === id ? updatedTask : t)));
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
