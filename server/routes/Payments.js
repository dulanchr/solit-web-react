const express = require('express');
const router = express.Router();
const { Payment } = require('../models');
const nodemailer = require('nodemailer');

router.get('/', async (req, res) => {
  const listOfPayments = await Payment.findAll();
  console.log(listOfPayments);
  res.json(listOfPayments);
});

router.post('/', async (req, res) => {
  try {
    const paymentData = req.body;
    const createdPayment = await Payment.create(paymentData);

    const transporter = nodemailer.createTransport({
      service: 'Gmail', // You can change this to another email service provider if needed
      auth: {
        user: 'soliteducation@gmail.com', // Replace with your Gmail username
        pass: '2HWWo09j)(r#', // Replace with your Gmail password
      },
    });

    const emailOptions = {
      from: 'soliteducation@gmail.com',
      to: createdPayment.email,
      subject: 'Payment Confirmation',
      text: `Thank you for your payment! Your payment was successful. If you are willing to be a member of the CORE community, use the following link and code (${createdPayment.usercode}) to request Membership. Thank You, Good luck on your learning!`,
    };
    

    transporter.sendMail(emailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    
    res.json({ payment: createdPayment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create payment' });
  }
});

module.exports = router;
