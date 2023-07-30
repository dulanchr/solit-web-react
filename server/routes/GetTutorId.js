const express = require('express');
const router = express.Router();
const { Question, User, Tutor, Assignment } = require('../models');


router.get('/user/:userId', async (req, res) => {

    const  userId  = req.params.userId;
    const tutor = await User.findAll({ 
      attributes:['password'],
      where:  {userId: userId},
      
      include:[
        {
          model:Tutor,
          attributes:['firstname','lastname','tutorId']
        },
       
      ]
    });

    const filteredData = tutor.map((det) =>({
      firstname: det.Tutors[0]?.firstname,
      lastname: det.Tutors[0]?.lastname,
      tutorId: det.Tutors[0]?.tutorId
    }))

    res.json(filteredData);
 
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
