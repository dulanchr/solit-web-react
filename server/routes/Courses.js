const express = require('express');
const router = express.Router();
const { Course } = require('../models');


router.get("/", async (req, res) =>{
  const listOfCourses = await Course.findAll();
  console.log(listOfCourses);
  res.json(listOfCourses);
}); 



router.post('/', async (req, res) => {
  try {
    const courseData = req.body;
    await Course.create(courseData);
    res.status(201).json(courseData);
  } catch (error) {
    console.error('Error submitting data:', error);
    res.status(500).json({ error: 'Failed to create course' });
  }
});



router.post('/', async (req, res) => {
  try {
    const { courseData, tutorData } = req.body;

    // Create a new course
    const newCourse = await Course.create(courseData);

    // If tutorData is provided, create a new tutor
    let newTutor;
    if (tutorData) {
      newTutor = await Tutor.create(tutorData);
    }

    res.status(201).json({
      course: newCourse,
      tutor: newTutor,
    });
  } catch (error) {
    console.error('Error submitting data:', error);
    res.status(500).json({ error: 'Failed to create course and/or tutor' });
  }
});


  
module.exports = router;
