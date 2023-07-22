const express = require('express');
const router = express.Router();
const { Requester } = require('../models');

// Get all requesters (if needed)
router.get('/', async (req, res) => {
  try {
    const requesters = await Requester.findAll();
    res.json(requesters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new requester (signup route)
router.post('/', async (req, res) => {
  try {
    const requestData = req.body;
    const newRequester = await Requester.create(requestData);
    res.json(newRequester);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
