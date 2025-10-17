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
      
      setTasks((prevTasks) => [...prevTasks, data]);
    } catch (err) {
      console.error("Failed to add task", err);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
