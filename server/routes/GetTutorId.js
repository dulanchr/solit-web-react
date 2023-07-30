const express = require('express');
const router = express.Router();
const { Question, User, Tutor, Assignment } = require('../models');


router.get('/assignment/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const tutor = await Tutor.findOne({
      where: { userId },
      attributes: ['tutorId'], 
    });

    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found for the given userId' });
    }

    const assignments = await Assignment.findAll({
      where: { tutorId: tutor.tutorId },
      include: [Tutor], 
    });

    res.json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
