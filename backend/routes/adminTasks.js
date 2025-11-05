import express from "express";
import Task from "../models/Task.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/user/:userId", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Access denied: Admins only" });

    const { userId } = req.params;
    const tasks = await Task.find({ userId });

    res.json(tasks);
  } catch (err) {
    console.error("Error fetching user tasks:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
