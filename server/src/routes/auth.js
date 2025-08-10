const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Missing credentials' });
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: 'Invalid username or password' });
    const ok = await bcrypt.compare(password, admin.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid username or password' });
    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET || 'supersecretjwt', {
      expiresIn: '1d',
    });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


