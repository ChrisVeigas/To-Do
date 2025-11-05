import express from "express";
import Task from "../models/Task.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/user/:userId", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Access denied: Admins only" });

    const { userId } = req.params;
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching user tasks:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/all", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Access denied: Admins only" });

    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching all tasks:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title)
      return res.status(400).json({ message: "Task title is required" });

    const newTask = new Task({
      title,
      description,
      userId: req.user.id,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const { progress } = req.body;

    const filter =
      req.user.role === "admin"
        ? { _id: req.params.id }
        : { _id: req.params.id, userId: req.user.id };

    const task = await Task.findOneAndUpdate(
      filter,
      { progress },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id/edit", auth, async (req, res) => {
  try {
    const { title, description } = req.body;

    const filter =
      req.user.role === "admin"
        ? { _id: req.params.id }
        : { _id: req.params.id, userId: req.user.id };

    const task = await Task.findOne(filter);
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
    const filter =
      req.user.role === "admin"
        ? { _id: req.params.id }
        : { _id: req.params.id, userId: req.user.id };

    const task = await Task.findOneAndDelete(filter);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/", auth, async (req, res) => {
  try {
    await Task.deleteMany({ userId: req.user.id });
    res.json({ message: "All tasks deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete all tasks" });
  }
});

export default router;
