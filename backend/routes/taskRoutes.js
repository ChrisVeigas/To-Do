import express from "express";
import Task from "../models/Task.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({ title, description, userId: req.user.id });
    await newTask.save();
    res.json(newTask); 
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
