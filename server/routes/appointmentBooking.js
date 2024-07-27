// const express = require('express');
// const router = express.Router();
// const Doctor = require('../models/doctorModel');

// // Route to add a patient ID to a doctor's patients array
// router.put('/booking', async (req, res) => {
//   const { doctorId } = req.params;
//   const { patientId } = req.body;

//   try {
//     // Find the doctor and update the patients array
//     const doctor = await Doctor.findById(doctorId);
//     if (!doctor) {
//       return res.status(404).json({ message: 'Doctor not found' });
//     }

//     // Push the patient ID to the array
//     if (!doctor.patients.includes(patientId)) {
//       doctor.patients.push(patientId);
//       await doctor.save();
//     }

//     res.status(200).json({ message: 'Patient added successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating doctor' });
//   }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Doctor = require('../models/doctorModel');

// // Route to add a patient ID to a doctor's patients array
// router.put('/booking', async (req, res) => {
//   const { doctorId, patientId } = req.body;

//   try {
//     // Find the doctor and update the patients array
//     const doctor = await Doctor.findById(doctorId);
//     if (!doctor) {
//       return res.status(404).json({ message: 'Doctor not found' });
//     }

//     // Push the patient ID to the array
//     if (!doctor.patients.includes(patientId)) {
//       doctor.patients.push(patientId);
//       await doctor.save();
//     }

//     res.status(200).json({ message: 'Patient added successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating doctor', error: error.message });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctorModel');

router.put('/booking', async (req, res) => {
  const { doctorId, patientId } = req.body;

  console.log('Received Doctor ID:', doctorId);  // Log Doctor ID
  console.log('Received Patient ID:', patientId);  // Log Patient ID

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if (!doctor.patients.includes(patientId)) {
      doctor.patients.push(patientId);
      await doctor.save();
    }

    res.status(200).json({ message: 'Patient added successfully' });
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({ message: 'Error updating doctor', error: error.message });
  }
});

module.exports = router;


