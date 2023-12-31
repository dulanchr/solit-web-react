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


  router.get('/byId/:Id', async (req, res) => {
    const id = req.params.Id;
    try {
      const userinformation = await User.findByPk(id);
      if (!userinformation) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.json(userinformation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
module.exports = router;
