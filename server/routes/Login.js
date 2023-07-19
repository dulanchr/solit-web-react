// routes/auth.js

const express = require('express');
const router = express.Router();
const { User, Student, Tutor, Admin } = require('../models');

// User login route
router.get('/', async (req, res) => {
  const { email, password } = await req.query;

  try {
    // Check if the user exists in the User model
    const user = await User.findOne({ where: { email, password } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the user is a student
    const student = await Student.findOne({ where: { userId: user.userId } });
    if (student) {
      return res.json({ userType: 'student', user });
    }

    // Check if the user is a tutor
    const tutor = await Tutor.findOne({ where: { userId: user.userId } });
    if (tutor) {
      return res.json({ userType: 'tutor', user });
    }

    // Check if the user is an admin
    const admin = await Admin.findOne({ where: { userId: user.userId } });
    if (admin) {
      return res.json({ userType: 'admin', user });
    }

    return res.status(401).json({ error: 'User type not recognized' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Failed to log in' });
  }
});

module.exports = router;
