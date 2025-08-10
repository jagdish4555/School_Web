const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subject: { type: String, required: true },
    photoUrl: { type: String },
    bio: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Teacher', teacherSchema);


