import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date, required: true },
  tag: { type: String, required: false },
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
