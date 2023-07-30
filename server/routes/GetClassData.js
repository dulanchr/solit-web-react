const express = require('express');
const router = express.Router();
const { Class, User } = require('../models');

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId, {
      include: {
        model: Tutor,
        include: [Class],
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const classes = user.Tutors.map((tutor) => tutor.Classes);
    const allClasses = [].concat(...classes); // Flatten the array of arrays

    if (allClasses.length === 0) {
      return res.status(404).json({ error: 'No classes found for the given user' });
    }

    res.json(allClasses);
  } catch (error) {
    console.error('Error fetching class data:', error);
    res.status(500).json({ error: 'Failed to fetch class data' });
  }
});

module.exports = router;
