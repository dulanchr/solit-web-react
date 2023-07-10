const express = require('express');
const router = express.Router();
const { Admin } = require('../models');

// Get all admins
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new admin
router.post('/', async (req, res) => {
  try {
    const adminData = req.body;
    const newAdmin = await Admin.create(adminData);
    res.json(newAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
