const express = require('express');
const router = express.Router();
const { User, Student, Tutor, Admin } = require('../models');
const { sign } = require('jsonwebtoken');


// GET method for login
router.get('/', async (req, res) => {
  const { email, password } = req.query;

  try {
    const user = await User.findOne({ where: { email, password } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate the access token
    const accessToken = sign({ username: user.firstname, id: user.userId }, "importantsecret");

    const student = await Student.findOne({ where: { userId: user.userId } });
    if (student) {
      return res.json({ userType: 'student', user, accessToken });
    }

    const tutor = await Tutor.findOne({ where: { userId: user.userId } });
    if (tutor) {
      return res.json({ userType: 'tutor', user, accessToken });
    }

    const admin = await Admin.findOne({ where: { userId: user.userId } });
    if (admin) {
      return res.json({ userType: 'admin', user, accessToken });
    }

    return res.status(401).json({ error: 'User type not recognized' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Failed to log in' });
  }
});

module.exports = router;
