const express = require('express');
const router = express.Router();
const { Course } = require('../models');
const multer = require('multer');
const path = require('path');

// Storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // The folder where the uploaded image will be saved
  },
  filename: function (req, file, cb) {
    // Rename the uploaded file to avoid name conflicts (you can use any desired naming convention)
    const uniqueFilename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    cb(null, uniqueFilename);
  }
});

// Configure multer with the storage options
const upload = multer({ storage: storage });

// POST route to handle image upload
router.post('/upload', upload.single('thumbnail'), async (req, res) => {
  try {
    // req.file contains the uploaded file information
    const uploadedFile = req.file;

    // Process and save the image to a suitable location (e.g., AWS S3, file system, etc.)
    // In this example, we'll assume the image is stored in the 'uploads' folder on the server

    const imageUrl = 'https://example.com/uploads/' + uploadedFile.filename; // Replace 'example.com' with your server URL

    // Return the URL of the uploaded image back to the client
    res.json({ thumbnailUrl: imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// POST route to handle course creation
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

module.exports = router;
