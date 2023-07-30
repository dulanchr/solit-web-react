const express = require('express');
const router = express.Router();
const { AssignmentStudent, Assignment } = require('../models');

const validToken = require('../middlewares/AuthMiddleware');

// Get all AssignmentStudents
router.get('/',  async (req, res) => {
  try {
    const AssignmentStudents = await AssignmentStudent.findAll({
      include: [
        {
          model: Assignment,
          attributes: ['title'],
          where: { assignmentId: AssignmentStudent.assignmentId },
        },
      ],
    });

    res.json(AssignmentStudents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
