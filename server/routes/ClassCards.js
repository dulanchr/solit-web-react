const express = require('express');
const router = express.Router();
const { Class, Tutor } = require('../models');

// Get all CourseCards
router.get('/', async (req, res) => {
  try {
    const CourseCardInfo = await Class.findAll({
      include: [
        {
          model: Tutor,
          attributes: ['firstname', 'lastname'],
        },
      ],
    });

    res.json(CourseCardInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/byId/:Id', async (req, res) => {
  const Id = req.params.Id;
  try {
    const classcontent = await Class.findByPk(Id, {
      include: [
        {
          model: Tutor,
          attributes: ['firstname', 'lastname'],
        },
      ],
    });
    if (!classcontent) {
      return res.status(404).json({ error: 'Class content not found.' });
    }
    res.json(classcontent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
