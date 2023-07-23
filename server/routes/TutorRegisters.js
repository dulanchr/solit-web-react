const express = require('express');
const router = express.Router();

// Import the Sequelize models
const { User, Tutor } = require('../models');

// Route to handle tutor registration (POST /tutors)
router.post('/', async (req, res) => {
  try {
    // Extract tutor data from the request body
    const { firstname, lastname, tel, address, description, email, password } = req.body;

    // Check if the email already exists in the User model
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    // Create a new User record
    const newUser = await User.create({ email, password });

    // Create a new Tutor record associated with the newly created User
    const newTutor = await Tutor.create({
      firstname,
      lastname,
      tel,
      address,
      description,
      userId: newUser.userId,
    });

    return res.status(201).json(newTutor);
  } catch (err) {
    console.error('Error registering tutor:', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
