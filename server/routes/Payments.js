const express = require('express');
const router = express.Router();
const { Payment } = require('../models');

router.get('/', async (req, res) => {
  const listOfPayments = await Payment.findAll();
  console.log(listOfPayments);
  res.json(listOfPayments);
});

router.post('/', async (req, res) => {
  try {
    const paymentData = req.body;
    const createdPayment = await Payment.create(paymentData);
    res.json(createdPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create payment' });
  }
});

module.exports = router;
