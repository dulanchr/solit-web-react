const express = require('express');
const router = express.Router();
const { Question, User, Student, Assignment } = require('../models');

router.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    const student = await User.findAll({ 
      attributes: ['password'],
      where: { userId: userId },
      include: [
        {
          model: Student,
          attributes: ['studentId', 'firstname', 'lastname', 'fether', 'rating', 'gender', 'tel', 'telparent', 'address', 'school', 'grade'],
        },
      ]
    });
  
    const filteredData = student.map((det) => ({
     
      firstname: det.Students[0] ? det.Students[0].firstname : null,
      lastname: det.Students[0] ? det.Students[0].lastname : null,
      studentId: det.Students[0] ? det.Students[0].studentId : null
    }));
    

    res.json(filteredData,);

  });
 
  router.get('/students/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const student = await User.findOne({ 
        where: { userId: userId },
        include: [
          {
            model: Student,
            attributes: ['studentId', 'firstname', 'lastname', 'fether', 'rating', 'gender', 'tel', 'telparent', 'address', 'school', 'grade'],
          },
        ]
      });
  
      if (!student) {
        return res.status(404).json({ error: 'Student not found.' });
      }
  
      const { password, Student: studentData } = student; 
  
      res.json({
        userId,
        student: studentData,
      });
  
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });
  


router.get('/assignment', async (req, res) => {
  try {
    const assignments = await Assignment.findAll({
    });

    res.json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
