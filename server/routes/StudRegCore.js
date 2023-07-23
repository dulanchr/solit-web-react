const express = require('express');
const router = express.Router();
const db = require('../models');

// Get all requesters
router.get('/requesters', async (req, res) => {
  try {
    const requesters = await db.Requester.findAll();
    res.json(requesters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update User and Student models based on Requester data
router.post('/requesters/:requesterId/update', async (req, res) => {
  try {
    const { requesterId } = req.params;
    const requester = await db.Requester.findByPk(requesterId);

    if (!requester) {
      return res.status(404).json({ error: 'Requester not found' });
    }

    // Create User
    const user = await db.User.create({
      email: requester.email,
      password: 'defaultPassword', // You might want to generate a random password here
    });

    // Create Student
    const student = await db.Student.create({
      firstname: requester.firstname,
      lastname: requester.lastname,
      gender: requester.gender,
      tel: requester.tel,
      telparent: requester.telparent,
      address: requester.address,
      school: requester.school,
      grade: requester.grade,
      userId: user.userId,
    });

    res.json({ user, student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
