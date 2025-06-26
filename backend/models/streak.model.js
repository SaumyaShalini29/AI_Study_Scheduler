import mongoose from "mongoose";

const streakSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  count: { type: Number, default: 0 },
  lastDate: { type: String, default: null }
});

const Streak = mongoose.model("Streak", streakSchema);
export default Streak;

