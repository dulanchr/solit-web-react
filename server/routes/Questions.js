const express = require('express');
const router = express.Router();
const { Question, User, Answer, Student } = require('../models');

// Get all questions
router.get('/:userId', async (req, res) => {
  try {
    const  userId  = req.params.userId;
    const myquestions = await Question.findAll({
      where:  {userId: userId},
      include: [
        {
        model: Answer,
        attributes: ['answerId', 'contentpdf', 'reply', 'userId'],
        include: [
          {
          model: User,
          attributes: ['email']
          
        }
        ],
      }
      ],
    });
    res.json(myquestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Create a new question
router.post('/', async (req, res) => {
  try {
    const questionData = req.body;
    const newQuestion = await Question.create(questionData);
    res.json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.delete('/remove/:id', async (req, res) => {
  try {
    const questionId = req.params.id;
    const deleteQuestion = await Question.destroy({
      where: { questionId },
    });

    if (deleteQuestion === 0) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
