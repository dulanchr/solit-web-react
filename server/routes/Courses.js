const express = require('express');
const router = express.Router();
const { Course } = require('../models');

router.get("/", async (req,res) =>{
  const listOfCourses = await Course.findAll();
  console.log(listOfCourses);
  res.json(listOfCourses);
});  

router.post('/', async (req, res) => {
    
      const courseData = req.body;
      await Course.create(courseData);
      res.json(courseData);
  });
  
module.exports = router;
