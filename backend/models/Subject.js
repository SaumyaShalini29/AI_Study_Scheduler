/*import mongoose from 'mongoose';

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Hard', 'Medium', 'Easy'],
    required: true
  },
  performance: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  studyDuration: {
    type: Number,  // Study time in minutes
    required: true,
    min: 0
  },
  studyTime: {
    type: String,  // e.g., "Morning", "Afternoon", "Evening"
    enum: ['Morning', 'Afternoon', 'Evening'],
    required: true
  }
});

const Subject = mongoose.model('Subject', SubjectSchema);

export default Subject;
/*
*/
/*
import mongoose from 'mongoose';

const SubjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Hard', 'Medium', 'Easy'],
      required: true,
    },
    performance: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    studyDuration: {
      type: Number, // in minutes
      required: true,
      min: 0,
    },
    studyTime: {
      type: String,
      enum: ['Morning', 'Afternoon', 'Evening'],
      required: true,
    },
  },
  { timestamps: true } // ⬅️ This adds createdAt and updatedAt fields
);

const Subject = mongoose.model('Subject', SubjectSchema);

export default Subject;
*/
import mongoose from 'mongoose';

const SubjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    priority: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
    difficulty: { type: String, enum: ['Hard', 'Medium', 'Easy'], required: true },
    performance: { type: Number, required: true, min: 0, max: 100 },
    studyDuration: { type: Number, required: true, min: 0 },
    studyTime: { type: String, enum: ['Morning', 'Afternoon', 'Evening'], required: true },
    userId: { type: String, required: true }, // ✅ Don't forget to add this if needed
  },
  { timestamps: true }
);

const Subject = mongoose.model('Subject', SubjectSchema);
export default Subject;
