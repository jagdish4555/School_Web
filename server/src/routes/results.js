const express = require('express');
const multer = require('multer');
const path = require('path');
const xlsx = require('xlsx');
const Result = require('../models/Result');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '..', '..', (process.env.UPLOAD_DIR || 'uploads'));
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Upload results Excel (protected)
router.post('/upload', requireAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const json = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });

    // Expect columns: RollNumber, StudentName, Class, Subject1..Subject7
    const documents = [];
    for (const row of json) {
      const rollNumber = String(row.RollNumber || row.roll || row.rollNumber || '').trim();
      const studentName = String(row.StudentName || row.name || row.student || '').trim();
      const className = String(row.Class || row.class || '').trim();

      const marks = [];
      let total = 0;
      Object.keys(row).forEach((key) => {
        if (/^subject/i.test(key)) {
          const subject = key.toString();
          const value = Number(row[key]);
          if (!Number.isNaN(value)) {
            marks.push({ subject, marks: value });
            total += value;
          }
        }
      });

      const percentage = marks.length > 0 ? Math.round((total / (marks.length * 100)) * 10000) / 100 : 0;

      if (rollNumber && studentName) {
        documents.push({ rollNumber, studentName, className, marks, total, percentage });
      }
    }

    // Upsert per rollNumber
    const ops = documents.map((doc) => ({
      updateOne: { filter: { rollNumber: doc.rollNumber }, update: { $set: doc }, upsert: true },
    }));
    if (ops.length > 0) await Result.bulkWrite(ops);

    res.json({ insertedOrUpdated: ops.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to process file' });
  }
});

// Public: fetch by roll number
router.get('/:rollNumber', async (req, res) => {
  try {
    const result = await Result.findOne({ rollNumber: req.params.rollNumber });
    if (!result) return res.status(404).json({ message: 'Result not found' });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


