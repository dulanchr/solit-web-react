const express = require('express');
const router = express.Router();
const { Class, Assignment } = require('../models'); // Make sure to import the Assignment model.

// Get all classes along with their associated assignments
router.get('/', async (req, res) => {
  try {
    const classes = await Class.findAll({
      include: {
        model: Assignment,
        attributes: ['assignmentId', 'title', 'description', 'content', 'deadline'], // Include specific attributes of Assignment
      },
    });
    res.json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new class
router.post('/', async (req, res) => {
  try {
    const classData = req.body;
    const newClass = await Class.create(classData);
    res.json(newClass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
