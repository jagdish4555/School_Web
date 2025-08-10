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
    rollNumber: { type: String, required: true, index: true },
    studentName: { type: String, required: true },
    className: { type: String },
    marks: [markSchema],
    total: { type: Number },
    percentage: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Result', resultSchema);


