const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51NZDIhKKyLhD2yiyj09mdJ71q6yAspLWYoJYSMHlkv4j8AS1FERxeEL5OGPn0uKB2iEO1tO91CWXDRyOACBAFCnG00WodpMsmi');

router.post('/', async (req, res) => {
  try {
    const { amount, currency, payment_method_types } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types,
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

module.exports = router;
