const express = require('express');
const router = express.Router();
const { Assignment, Tutor } = require('../models');
const validToken = require('../middlewares/AuthMiddleware');

router.get('/', async (req, res) => {
  try {
    const Assignments = await Assignment.findAll({
      include: [
        {
          model: Tutor,
          attributes: ['firstname', 'lastname'], 
        },
      ],
    });

    res.json(Assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
