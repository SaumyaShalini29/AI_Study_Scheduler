import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Todo", todoSchema);
