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
          attributes:['firstname','lastname','tutorId','description' ]
        },
       
      ]
    });

    const filteredData = tutor.map((det) =>({
      firstname: det.Tutors[0]?.firstname,
      lastname: det.Tutors[0]?.lastname,
      description: det.Tutors[0]?.description,
      tutorId: det.Tutors[0]?.tutorId
    }))

    res.json(filteredData);
 
});

router.get('/poste', async (req, res) => {
  try {
    const assignments = await Assignment.findAll();
    const questions = await Question.findAll();
    
    const combinedData = [];
    assignments.forEach((assignment) => {
      combinedData.push({ type: "assignment", data: assignment });
    });
    questions.forEach((question) => {
      combinedData.push({ type: "question", data: question });
    });

    const formattedData = combinedData.map(({ type, data }) => ({
      type,
      questionId: data.questionId,
      assignmentId: data.assignmentId,
      title: data.title,
      description: data.description,
      content: data.content,
      deadline: data.deadline,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      classId: data.classId,
      tutorId: data.tutorId,
      userId: data.userId,
    }));

    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
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
