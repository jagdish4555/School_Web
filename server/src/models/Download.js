const mongoose = require('mongoose');

const downloadSchema = new mongoose.Schema(
  {
    rollNumber: { type: String, required: true, unique: true },
    downloadedAt: { type: Date, default: Date.now },
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Download', downloadSchema);
