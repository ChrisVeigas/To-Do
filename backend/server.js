import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

app.use("/api", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
