const express = require('express');
const router = express.Router();
const { Class, Assignment, Tutor } = require('../models');

// Get all classes along with their associated assignments
router.get('/', async (req, res) => {
  try {
    const classes = await Class.findAll({
      include: {
        model: Assignment,
        attributes: ['assignmentId', 'title', 'description', 'content', 'deadline'],
      },
    });
    res.json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new class
router.post('/', async (req, res) => {
  try {
    const classData = req.body; // Make sure the request body contains the necessary data for creating a new class
    const newClass = await Class.create(classData, {
      include: [Assignment], // This will automatically associate the assignments with the newly created class
    });
    res.json(newClass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/:id', async (req, res) => {

  try {
    const classId = req.params.id;
    const deletedClass = await Class.destroy({
      where: { classId }});
    if (deletedClass == 0) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json({ message: 'Class and associated assignments deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;
