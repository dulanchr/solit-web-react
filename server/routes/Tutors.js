const express = require('express');
const router = express.Router();
const { Tutor } = require('../models');

// Get all tutors
router.get('/', async (req, res) => {
  try {
    const tutors = await Tutor.findAll();
    res.json(tutors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new tutor
router.post('/', async (req, res) => {
  try {
    const tutorData = req.body;
    const newTutor = await Tutor.create(tutorData);
    res.json(newTutor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/byId/:Id', async (req, res) => {
  const Id = req.params.Id;
  try {
    const teacherContent = await Tutor.findByPk(Id);
    if (!teacherContent) {
      return res.status(404).json({ error: 'Tutor content not found.' });
    }
    res.json(teacherContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;
