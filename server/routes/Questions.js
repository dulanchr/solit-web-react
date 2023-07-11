const express = require('express');
const router = express.Router();
const { Question, User } = require('../models');

// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.findAll({
      include: [User],
    });
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new question
router.post('/', async (req, res) => {
  try {
    const questionData = req.body;
    const newQuestion = await Question.create(questionData);
    res.json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
