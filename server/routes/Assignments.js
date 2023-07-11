const express = require('express');
const router = express.Router();
const { Assignment, Student, Tutor } = require('../models');

// Get all assignments
router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.findAll({
      include: [Student, Tutor],
    });
    res.json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new assignment
router.post('/', async (req, res) => {
  try {
    const assignmentData = req.body;
    const newAssignment = await Assignment.create(assignmentData);
    res.json(newAssignment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
