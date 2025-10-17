import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Slider,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTasks } from "../context/TaskContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

function ToDo() {
  const { tasks, setTasks } = useTasks();
  const { user } = useUser();
  const MotionLink = motion(Link);
  const MotionButton = motion(Button);

  // Local state for slider progress
  const [taskProgress, setTaskProgress] = useState({});

  // Initialize progress map whenever tasks change
  useEffect(() => {
    const progressMap = {};
    tasks.forEach((task) => {
      progressMap[task._id] = task.progress || 0;
    });
    setTaskProgress(progressMap);
  }, [tasks]);

  // Update progress on backend
  const updateProgress = async (taskId, newProgress) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ progress: newProgress }),
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const updatedTask = await res.json();
      setTasks((prev) => prev.map((t) => (t._id === taskId ? updatedTask : t)));
    } catch (err) {
      console.error("Failed to update task", err);
    }
  };

  const handleSliderChange = (taskId, value) => {
    setTaskProgress((prev) => ({ ...prev, [taskId]: value }));
  };

  const handleSliderCommit = (taskId, value) => {
    updateProgress(taskId, value);
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
    <Box
      component={motion.div}
      sx={{
        maxWidth: 450,
        margin: "auto",
        marginTop: 10,
        "&:hover": { boxShadow: 5 },
      }}
    >
      <Card sx={{ elevation: 0, backgroundColor: "#E9F1EF", mb: 1 }}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            color="#3C5556"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            {user ? `${user.username}'s To-Do List` : "To-Do List"}
          </Typography>

          <Typography variant="body2" color="#3C5556" sx={{ mb: 2 }}>
            Manage your tasks efficiently.
          </Typography>

          <List>
            {tasks.length === 0 ? (
              <Typography
                variant="body2"
                color="#3C5556"
                sx={{ fontStyle: "italic" }}
              >
                No tasks yet. Add one!
              </Typography>
            ) : (
              tasks.map((task) => {
                const progress = taskProgress[task._id] || 0;

                return (
                  <ListItem
                    key={task._id}
                    sx={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                      mb: 0.1,
                      p: 0.1,
                      borderRadius: 2,
                      background:
                        "linear-gradient(90deg, rgba(255,0,0,0.05), rgba(0,128,0,0.05))",
                    }}
                  >
                    <ListItemText
                      primary={task.title}
                      secondary={task.description}
                    />

                    <Box sx={{ width: "100%", mt: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: "#ccc",
                          "& .MuiLinearProgress-bar": {
                            background: `linear-gradient(to right, 
                              #9C2007 0%, 
                              #F4830B 50%, 
                              #1B9C07 100%)`,
                          },
                        }}
                      />
                    </Box>

                    {progress === 100 && (
                      <MotionButton
                        type="submit"
                        size="small"
                        variant="contained"
                        color="error"
                        component={motion.button}
                        whileHover={{ scale: 1.0 }}
                        whileTap={{ scale: 0.9 }}
                        sx={{ mt: 1 }}
                        onClick={() => deleteTask(task._id)}
                      >
                        Delete
                      </MotionButton>
                    )}

                    <Slider
                      value={progress}
                      onChange={(_, val) => handleSliderChange(task._id, val)}
                      onChangeCommitted={(_, val) =>
                        handleSliderCommit(task._id, val)
                      }
                      min={0}
                      max={100}
                      step={1}
                      sx={{ width: "100%", mt: 1 }}
                    />
                    <Typography variant="caption">{progress}%</Typography>
                  </ListItem>
                );
              })
            )}
          </List>

          <CardActions sx={{ justifyContent: "space-between", mt: 2 }}>
            <MotionLink
              to="/add"
              className="text-[#70056B] hover:text-[#70056B] font-medium bg-[#eee6ee] px-3 py-1 rounded-md shadow-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Add Task
            </MotionLink>

            <MotionLink
              to="/edit"
              className="text-[#70056B] hover:text-[#70056B] font-medium bg-[#eee6ee] px-3 py-1 rounded-md shadow-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Edit Task
            </MotionLink>

            <MotionLink
              to="/delete"
              className="text-[#70056B] hover:text-[#70056B] font-medium bg-[#eee6ee] px-3 py-1 rounded-md shadow-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Delete Task
            </MotionLink>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ToDo;
