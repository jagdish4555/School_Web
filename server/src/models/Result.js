const mongoose = require('mongoose');

const markSchema = new mongoose.Schema(
  {
    subject: String,
    marks: Number,
  },
  { _id: false }
);

const resultSchema = new mongoose.Schema(
  {
    rollNumber: { type: String, required: true, unique: true, index: true },
    studentName: { type: String, required: true },
    className: { type: String },
    examDescription: { type: String },
    marks: [markSchema],
    totalMarksGained: { type: Number },
    totalPossibleMarks: { type: Number },
    percentage: { type: Number },
    result: { type: String, enum: ['PASS', 'FAIL', 'પાસ', 'નાપાસ'], default: 'FAIL' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Result', resultSchema);


