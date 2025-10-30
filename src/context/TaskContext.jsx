/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";
import { useTaskAPI } from "../hooks/useTaskAPI";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const { token } = useUser();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const { fetchTasks, addTask, editTask, deleteTask } = useTaskAPI({
    token,
    setTasks,
    setLoading,
  });

  useEffect(() => {
    if (token) fetchTasks();
  }, [token, fetchTasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        loading,
        addTask,
        editTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
