const express = require('express');
const router = express.Router();
const { User, Student, Tutor, Admin } = require('../models');

router.get('/', async (req, res) => {
  try {
    const userInformation = await User.findAll({
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['firstname', 'lastname'],
        },
        {
          model: Tutor,
          as: 'tutor',
          attributes: ['firstname', 'lastname'],
        },
        {
          model: Admin,
          as: 'admin',
          attributes: ['firstname', 'lastname'],
        },
      ],
    });

    res.json(userInformation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
