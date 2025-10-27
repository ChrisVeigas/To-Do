import express from "express";
import Task from "../models/Task.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({ title, description, userId: req.user.id });
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const { progress } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { progress },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id/edit", auth, async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;

    await task.save();

    res.json(task);
  } catch (err) {
    console.error("Error editing task:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
