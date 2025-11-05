import express from "express";
import User from "../models/User.js";
import Task from "../models/Task.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/users", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    const users = await User.find({}, "username email role");
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/active-users", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    const activeUsers = await User.countDocuments({ active: true });
    res.json({ activeUsers });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/users/:id/tasks", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    const tasks = await Task.find({ userId: req.params.id });
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/users/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    await User.findByIdAndDelete(req.params.id);
    await Task.deleteMany({ userId: req.params.id }); 
    res.json({ message: "User and their tasks deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/users/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    const { username, email, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, role },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
