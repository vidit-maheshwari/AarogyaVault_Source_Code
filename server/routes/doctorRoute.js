const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctorModel');
const multer = require('multer');
const path = require('path');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Endpoint to register a doctor
router.post('/register', upload.single('image'), async (req, res) => {
  try {
    const { name, email, walletAddress, fee, specialization, experience, description } = req.body;
    const image = req.file.path; // Path to the uploaded image

    const doctor = new Doctor({
      name,
      email,
      walletAddress,
      fee,
      specialization,
      experience,
      description,
      image
    });

    await doctor.save();
    res.status(201).json({ message: 'Doctor registered successfully', doctor });
  } catch (error) {
    res.status(500).json({ message: 'Error registering doctor', error });
  }
});

// GET all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({ doctors });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error });
  }
});

module.exports = router;


module.exports = router;
