/*import mongoose from 'mongoose';

const StudyHistorySchema = new mongoose.Schema({
  subject: String,
  suggestedDuration: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('StudyHistory', StudyHistorySchema);
*/
const StudyHistorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  subject: String,
  suggestedDuration: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});
