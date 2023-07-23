const express = require('express');
const router = express.Router();
const { User, Student } = require('../models');

router.post('/', async (req, res) => {
  try {
    const { firstname, lastname, fether, rating, gender, tel, telparent, address, school, grade, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered.' });
    }
    const newUser = await User.create({ email, password });
    const newStudent = await Student.create({
      firstname,
      lastname,
      fether,
      rating,
      gender,
      tel,
      telparent,
      address,
      school,
      grade,
      userId: newUser.userId,
    });

    return res.status(201).json(newStudent);
  } catch (err) {
    console.error('Error registering student:', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
