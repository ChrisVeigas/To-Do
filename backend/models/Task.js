import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  progress: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now}
});

export default mongoose.model("Task", taskSchema);
