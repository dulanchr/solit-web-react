// Backend (Express) Route
const express = require('express');
const router = express.Router();
const { Tutor, Course, User } = require('../models');

// Get all CourseCards
router.get('/', async (req, res) => {
  try {
    const courseCards = await Course.findAll({
      include: [
        {
          model: Tutor,
          as: 'tutor',
          attributes: ['firstname', 'lastname'],
        },
      ],
    });
    res.json(courseCards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get CourseContent by courseId
router.get('/byId/:Id', async (req, res) => {
  const Id = req.params.Id;
  try {
    const coursecontent = await Course.findByPk(Id);
    if (!coursecontent) {
      return res.status(404).json({ error: 'Course content not found.' });
    }
    res.json(coursecontent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
