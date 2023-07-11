const express = require('express');
const router = express.Router();
const { AssignmentStudent, Assignment, Student } = require('../models');

// Get all assignment students
router.get('/', async (req, res) => {
  try {
    const assignmentStudents = await AssignmentStudent.findAll({
      include: [Assignment, Student],
    });
    res.json(assignmentStudents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new assignment student
router.post('/', async (req, res) => {
  try {
    const assignmentStudentData = req.body;
    const newAssignmentStudent = await AssignmentStudent.create(assignmentStudentData);
    res.json(newAssignmentStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
