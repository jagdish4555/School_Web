const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['principal'], default: 'principal' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);


