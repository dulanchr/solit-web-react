const express = require('express');
const router = express.Router();
const { Tutor, User} = require('../models');

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

// Get tutor by ID
router.get('/byId/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const tutor = await Tutor.findByPk(id);
    if (!tutor) {
      return res.status(404).json({ error: 'Tutor not found.' });
    }
    res.json(tutor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/byUserId/:userId', async (req, res) => {
  const userId = req.params.userId; // Corrected
  
  try {
    const userWithTutor = await Tutor.findOne({
      where: { userId:userId },
      // include: [
      //   {
      //     model: Tutor,
      //     as: "user", 
      //   },
      // ],
    });

    if (!userWithTutor) {
      return res.status(404).json({ message: "User not found" });
    }
    
    return res.status(200).json(userWithTutor);
  } catch (error) {
    console.error("Error fetching tutor information:", error);
    return res.status(500).json(error.message);
  }
});


module.exports = router;
