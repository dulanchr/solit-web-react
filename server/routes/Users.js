const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.get("/", async (req,res) =>{
  const listOfUsers = await User.findAll();
  console.log(listOfUsers);
  res.json(listOfUsers);
});  

router.post('/', async (req, res) => {
    
      const userData = req.body;
      await User.create(userData);
      res.json(userData);
  });
  
module.exports = router;
