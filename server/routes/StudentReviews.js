const express = require('express');
const router = express.Router();
const { StudentReview } = require('../models');

// Get all StudentReviews
router.get('/', async (req, res) => {
  try {
    const listOfStudentReview = await StudentReview.findAll();
    res.json(listOfStudentReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new StudentReview
router.post('/', async (req, res) => {
  try {
    const studentReviewData = req.body;
    await StudentReview.create(studentReviewData);
    res.status(201).json(studentReviewData);
  } catch (error) {
    console.error('Error submitting data:', error);
    res.status(500).json({ error: 'Failed to create student review' });
  }
});

module.exports = router;
