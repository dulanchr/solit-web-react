const express = require('express');
const router = express.Router();
const { Class, Assignment, Student, Tutor } = require('../models');


const validToken = require('../middlewares/AuthMiddleware');
// Get all assignments

router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.findAll({
      include: [
        {
          model: Class,
          attributes: ['className', 'classId'], 
        },
        Student,
        Tutor,
      ],
    });
    res.json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
// Create a new assignment
router.post('/', async (req, res) => {
  try {
    const assignmentData = req.body;
    const newAssignment = await Assignment.create(assignmentData);
    
    res.json(newAssignment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const assignmentId = req.params.id;
    const deletedAssignment = await Assignment.destroy({
      where: { assignmentId },
    });

    if (deletedAssignment === 0) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;
    const updatedAssignmentData = req.body;

   const updateAssignment = await updatedAssignmentData.update(updatedAssignmentData, {
      where: { assignmentId: assignmentId },
    });
    res.json(updateAssignment)

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;