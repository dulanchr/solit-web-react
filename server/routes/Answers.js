const express = require('express');
const router = express.Router();
const { Answer } = require('../models');

// Get all answers
router.get('/', async (req, res) => {
  try {
    const answers = await Answer.findAll();
    res.json(answers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new answer
router.post('/', async (req, res) => {
  try {
    const answerData = req.body;
    const newAnswer = await Answer.create(answerData);
    res.json(newAnswer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
