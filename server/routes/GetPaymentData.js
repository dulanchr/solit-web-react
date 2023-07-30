const express = require('express');
const router = express.Router();
const { Payment } = require('../models');

router.get("/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Payment.findByPk(courseId);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error('Error fetching course data:', error);
    res.status(500).json({ error: 'Failed to fetch course data' });
  }
});

module.exports = router;
