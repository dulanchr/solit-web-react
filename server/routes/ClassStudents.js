const express = require('express');
const router = express.Router();
const { ClassStudent } = require('../models');

// Get all class students
router.get('/', async (req, res) => {
  try {
    const classStudents = await ClassStudent.findAll();
    res.json(classStudents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new class student
router.post('/', async (req, res) => {
  try {
    const classStudentData = req.body;
    const newClassStudent = await ClassStudent.create(classStudentData);
    res.json(newClassStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
