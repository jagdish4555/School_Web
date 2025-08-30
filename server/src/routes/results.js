const express = require('express');
const multer = require('multer');
const path = require('path');
const xlsx = require('xlsx');

const Result = require('../models/Result');
const Download = require('../models/Download');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
// Rate limiting map
const rateLimitMap = new Map();

const checkRateLimit = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const windowMs = 5 * 60 * 1000; // 5 minutes
  const maxRequests = 5;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return next();
  }

  const userLimit = rateLimitMap.get(ip);

  // If time window expired → reset
  if (now > userLimit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return next();
  }

  // If limit exceeded
  if (userLimit.count >= maxRequests) {
    const waitSeconds = Math.ceil((userLimit.resetTime - now) / 1000);
    return res
      .status(429)
      .json({ error: `Too many requests. Try again in ${waitSeconds} seconds.` });
  }

  // Otherwise, increment count
  userLimit.count++;
  next();
};

// Multer storage config
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * Upload results Excel (protected)
 */
router.post('/upload', requireAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const json = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });

    console.log('First row keys:', Object.keys(json[0])); // Debug log
    console.log('Sample row:', json[0]); // Debug log
    
    // Check if the exact column names exist
    console.log('Has "marks gained" column:', json[0].hasOwnProperty('marks gained'));
    console.log('Has "total marks" column:', json[0].hasOwnProperty('total marks'));
    console.log('Value of "marks gained":', json[0]['marks gained']);
    console.log('Value of "total marks":', json[0]['total marks']);

    const documents = [];
    let examDescription = '';

    // Extract exam description from first row or use default
    if (json.length > 0) {
      examDescription = String(
        json[0].ExamDescription ||
        json[0].examDescription ||
        json[0]['પરીક્ષા વર્ણન'] ||
        json[0]['Exam Title'] ||
        'EXAMINATION RESULT'
      ).trim();
    }

    // Process each row
    for (const row of json) {
      // Extract roll number - try different possible column names
      const rollNumber = String(
        row['પરીક્ષા નં.'] || 
        row.RollNumber || 
        row.roll || 
        row.rollNumber || 
        row['Roll Number'] ||
        ''
      ).trim();

      // Extract student name
      const studentName = String(
        row['વિદ્યાર્થીનું નામ'] ||
        row.StudentName || 
        row.name || 
        row.student || 
        row['Student Name'] ||
        ''
      ).trim();

      // Extract class
      const className = String(
        row.Class || 
        row.class || 
        row['વર્ગ'] ||
        ''
      ).trim();

      // Skip if no roll number or student name
      if (!rollNumber || !studentName) {
        console.log('Skipping row - missing roll number or student name:', { rollNumber, studentName });
        continue;
      }

      // Extract total marks gained and total possible marks FIRST
      let totalMarksGained = 0;
      let totalPossibleMarks = 1600; // Default

      // Find the total columns by looking for key patterns
      const allKeys = Object.keys(row);
      const marksGainedKey = allKeys.find(key => 
        key.toLowerCase().includes('marks') && key.toLowerCase().includes('gained')
      );
      const totalMarksKey = allKeys.find(key => 
        key.toLowerCase().includes('total') && key.toLowerCase().includes('marks') && 
        !key.toLowerCase().includes('gained')
      );

      console.log('Found marksGainedKey:', marksGainedKey);
      console.log('Found totalMarksKey:', totalMarksKey);

      if (marksGainedKey) {
        totalMarksGained = Number(row[marksGainedKey]) || 0;
        console.log('Extracted totalMarksGained:', totalMarksGained);
      }
      
      if (totalMarksKey) {
        totalPossibleMarks = Number(row[totalMarksKey]) || 1600;
        console.log('Extracted totalPossibleMarks:', totalPossibleMarks);
      }

      // Extract marks for subjects (only વિષય columns, explicitly exclude totals)
      const marks = [];
      const excludedKeys = [marksGainedKey, totalMarksKey].filter(Boolean); // Remove nulls
      
      Object.keys(row).forEach((key) => {
        // Only include વિષય columns that are NOT the total columns
        if (key.includes('વિષય') && !excludedKeys.includes(key)) {
          const value = row[key];
          const numericValue = Number(value);
          if (!isNaN(numericValue) && numericValue >= 0) {
            marks.push({ 
              subject: key.trim(), 
              marks: numericValue 
            });
          }
        }
      });

      // If total marks gained is still 0, calculate from subject marks as fallback
      if (totalMarksGained === 0 && marks.length > 0) {
        totalMarksGained = marks.reduce((sum, mark) => sum + mark.marks, 0);
        console.log('Calculated totalMarksGained from subjects:', totalMarksGained);
      }

      // Extract result
      const resultFromExcel = String(
        row['પરિણામ'] ||
        row.Result || 
        row.result ||
        ''
      ).trim().toLowerCase();

      let result = 'FAIL';
      if (resultFromExcel.includes('pass') || 
          resultFromExcel.includes('પાસ') || 
          resultFromExcel === 'પાસ') {
        result = 'PASS';
      } else if (resultFromExcel.includes('fail') || 
                 resultFromExcel.includes('નાપાસ') ||
                 resultFromExcel === 'નાપાસ') {
        result = 'FAIL';
      } else {
        // Auto-determine result based on percentage if not specified
        const calculatedPercentage = totalPossibleMarks > 0 
          ? (totalMarksGained / totalPossibleMarks) * 100 
          : 0;
        result = calculatedPercentage >= 35 ? 'PASS' : 'FAIL'; // Assuming 35% is pass criteria
      }

      // Calculate percentage
      const percentage = totalPossibleMarks > 0
        ? Math.round((totalMarksGained / totalPossibleMarks) * 10000) / 100
        : 0;

      console.log('Processing student:', {
        rollNumber,
        studentName,
        totalMarksGained,
        totalPossibleMarks,
        percentage,
        result,
        marksCount: marks.length
      });

      documents.push({
        rollNumber,
        studentName,
        className,
        examDescription,
        marks,
        totalMarksGained,
        totalPossibleMarks,
        percentage,
        result,
      });
    }

    console.log(`Processed ${documents.length} student records`);
    // Upsert documents by rollNumber
    const ops = documents.map((doc) => ({
      updateOne: {
        filter: { rollNumber: doc.rollNumber },
        update: { $set: doc },
        upsert: true,
      },
    }));

    if (ops.length > 0) {
      await Result.bulkWrite(ops);
      console.log(`Successfully inserted/updated ${ops.length} results`);
    }

    res.json({ 
      insertedOrUpdated: ops.length,
      message: `Successfully processed ${ops.length} student results`
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Failed to process file', error: err.message });
  }
});
/**
 * Clear all results (protected)
 */
router.delete('/clear', requireAuth, async (req, res) => {
  try {
    await Result.deleteMany({});
    await Download.deleteMany({});
    res.json({ message: 'All results cleared successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to clear results' });
  }
});
/**
 * Check if result has been downloaded
 */
router.get('/:rollNumber/download-status', async (req, res) => {
  try {
    const download = await Download.findOne({ rollNumber: req.params.rollNumber });
    res.json({ downloaded: !!download });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
/**
 * Mark result as downloaded
 */
router.post('/:rollNumber/download', async (req, res) => {
  try {
    const { rollNumber } = req.params;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    // Check duplicate download
    const existingDownload = await Download.findOne({ rollNumber });
    if (existingDownload) {
      return res.status(400).json({ message: 'Result already downloaded' });
    }

    await Download.create({ rollNumber, ipAddress, userAgent });

    res.json({ message: 'Download recorded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
/**
 * Public: Fetch result by roll number
 */
router.get('/:rollNumber', checkRateLimit, async (req, res) => {
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