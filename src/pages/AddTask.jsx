import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTasks } from "../context/TaskContext";

function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") return;

    addTask({ title, description });
    setTitle("");
    setDescription("");
    navigate("/"); 
  };

  return (
    <Box
      component={motion.div}
      sx={{
        maxWidth: 400,
        margin: "auto",
        marginTop: 10,
        p: 3,
        backgroundColor: "#E9F1EF",
        borderRadius: 2,
        boxShadow: 3,
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Typography
        variant="h5"
        component="div"
        color="#3C5556"
        sx={{ fontWeight: "bold", mb: 2 }}
      >
        Add New Task
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          component={motion.button} 
          type="submit"
          fullWidth
          sx={{
            backgroundColor: "#3C5556",
            color: "#fff",
            "&:hover": { backgroundColor: "#2C4445" },
            py: 1.5,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add Task
        </Button>
      </form>
    </Box>
  );
}

export default AddTask;
