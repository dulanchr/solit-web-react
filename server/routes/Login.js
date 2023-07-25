const express = require('express');
const router = express.Router();
const { User, Student, Tutor, Admin } = require('../models');

router.get('/', async (req, res) => {
  const { email, password } = await req.query;

  try {
    const user = await User.findOne({ where: { email, password } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const student = await Student.findOne({ where: { userId: user.userId } });
    if (student) {
      return res.json({ userType: 'student', user });
    }
    const tutor = await Tutor.findOne({ where: { userId: user.userId } });
    if (tutor) {
      return res.json({ userType: 'tutor', user });
    }
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
