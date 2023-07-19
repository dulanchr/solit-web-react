const express = require('express');
const router = express.Router();
const { Class, Tutor } = require('../models');

// Get all CourseCards
router.get('/', async (req, res) => {
  try {
    const CourseCardInfo = await Class.findAll({
      include: [
        {
          model: Tutor,
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
