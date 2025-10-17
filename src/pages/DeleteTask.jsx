import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTasks } from "../context/TaskContext";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

function DeleteTask() {
  const { tasks, setTasks } = useTasks();
  const { user } = useUser();
  const MotionLink = motion(Link);

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
        maxWidth: 500,
        margin: "auto",
        mt: 10,
        p: 3,
        backgroundColor: "#E9F1EF",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h5"
        component="div"
        color="#3C5556"
        sx={{ fontWeight: "bold", mb: 2 }}
      >
        {user ? `${user.name}'s Delete Tasks` : "Delete Tasks"}
      </Typography>

      {tasks.length === 0 ? (
        <Typography color="#3C5556">No tasks to delete.</Typography>
      ) : (
        <List>
          {tasks.map((task) => (
            <ListItem
              key={task._id}
              sx={{
                backgroundColor: "#fff",
                mb: 2,
                borderRadius: 2,
                boxShadow: 1,
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <ListItemText primary={task.title} secondary={task.description} />
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteTask(task._id)}
                sx={{ mt: 1 }}
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      )}

      <Box sx={{ mt: 2, textAlign: "center" }}>
        <MotionLink
          to="/"
          className="text-[#70056B] hover:text-[#70056B] font-medium bg-[#eee6ee] px-3 py-1 rounded-md shadow-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Back to To-Do
        </MotionLink>
      </Box>
    </Box>
  );
}

export default DeleteTask;
