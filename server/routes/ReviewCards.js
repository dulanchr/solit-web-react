const express = require('express');
const router = express.Router();
const { StudentReview, Student, Class, ClassStudent } = require('../models');

// Get all StudentReviews along with firstname, lastname, classes, and grades of the students
router.get('/', async (req, res) => {
  try {
    const studentReviewInfo = await StudentReview.findAll({
      include: [
        {
          model: Student,
          attributes: ['firstname', 'lastname'],
          include: [
            {
              model: Class,
              attributes: ['className', 'grade'],
              through: {
                attributes: [] // To exclude any unnecessary attributes from the join table
              }
            }
          ]
        },
      ],
    });

    res.json(studentReviewInfo);
  } catch (error) {
    console.error('Error fetching student reviews:', error);
    res.status(500).json({ error: 'Failed to fetch student reviews' });
  }
});

module.exports = router;
