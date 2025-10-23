import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import { useTasks } from "../context/TaskContext";
import { useParams, useNavigate } from "react-router-dom";

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);
const MotionTypography = motion.create(Typography);
const MotionButton = motion.create(Button);

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, editTask } = useTasks();

  const existingTask = tasks.find((t) => t._id === id);
  const [title, setTitle] = useState(existingTask ? existingTask.title : "");
  const [description, setDescription] = useState(
    existingTask ? existingTask.description : ""
  );

  useEffect(() => {
    if (!existingTask) {
      console.warn("Task not found in context");
    }
  }, [existingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() && !description.trim()) return;

    await editTask(id, { title, description });
    navigate("/"); 
  };

  return (
    <MotionBox
      className="flex justify-center items-center min-h-screen bg-gray-100 px-4"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <MotionCard
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="shadow-xl rounded-2xl w-full max-w-lg bg-white"
      >
        <CardContent className="p-8">
          <MotionTypography
            variant="h5"
            className="text-center mb-6 font-semibold"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            ✏️ Edit Task
          </MotionTypography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Description"
              variant="outlined"
              multiline
              minRows={3}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Box className="flex justify-end gap-3 pt-2">
              <MotionButton
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </MotionButton>

              <MotionButton
                variant="contained"
                color="primary"
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Save Changes
              </MotionButton>
            </Box>
          </Box>
        </CardContent>
      </MotionCard>
    </MotionBox>
  );
}
