const express = require('express');
const router = express.Router();
const { Student, User } = require('../models');

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new student
router.post('/', async (req, res) => {
  try {
    const studentData = req.body;
    const newStudent = await Student.create(studentData);
    res.json(newStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
router.post('/internal', async (req, res) => {
  try {
    const { firstname, lastname, tel, telparent, address, fether, rating, grade, gender, school, email, password } = req.body;
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered.' });
    }
    const newUser = await User.create({ email, password, Validity: true,});
    const newTutor = await Student.create({
      firstname,
      lastname,
      tel,
      telparent,
      address,
      fether: "0",
      rating: "0",
      grade,
      gender,
      school,
      userId: newUser.userId,
    });

    return res.status(201).json(newTutor);
  } catch (err) {
    console.error('Error registering tutor:', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});
module.exports = router;
