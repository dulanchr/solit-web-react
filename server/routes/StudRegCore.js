const express = require('express');
const router = express.Router();
const { User, Student } = require('../models');

router.get('/', async (req, res) => {
  try {
    const StudRegCore = await Student.findAll({
      include: [
        {
          model: User,
          
        },
      ],
    });

    res.json(StudRegCore);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
