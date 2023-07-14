const express = require('express');
const router = express.Router();
const { Tutor, Course, User } = require('../models');

// Get all CourseCards
router.get('/', async (req, res) => {
  try {
    const CourseCardInfo = await Course.findAll({
      include: [
        {
          model: Tutor,
          as: 'tutor',
          attributes: ['firstname', 'lastname'],
        },
      ],
    });

    res.json(CourseCardInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
