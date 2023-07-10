const express = require('express');
const router = express.Router();
const { Student } = require('../models');

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

module.exports = router;
