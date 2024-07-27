// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const File = require('../models/fileModel');
// const router = express.Router();

// // Set up multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../uploads')); // Ensure this path is correct
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// // Initialize multer with storage configuration
// const upload = multer({ storage: storage });

// router.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     const file = req.file;
//     if (!file) {
//       return res.status(400).send('No file uploaded.');
//     }

//     // Save file information to the database
//     const newFile = new File({
//       name: file.originalname,
//       path: file.path,
//       url: `/uploads/${file.filename}`,
//     });
//     await newFile.save();

//     res.json(newFile);
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     res.status(500).send('Failed to upload file.');
//   }
// });

// module.exports = router;


// correct code

// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const File = require('../models/fileModel'); // Adjust path as needed
// const User = require('../models/userModel'); // Adjust path as needed
// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../uploads')); // Adjust path as needed
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage });

// router.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     const file = req.file;
//     const walletAddress = req.body.walletAddress; // Ensure walletAddress is sent in the request body

//     if (!file) return res.status(400).send('No file uploaded.');
//     if (!walletAddress) return res.status(400).send('Wallet address is required.');

//     const newFile = new File({
//       name: file.originalname,
//       path: file.path,
//       url: `/uploads/${file.filename}`, // URL to access the file
//       filename: file.filename
//     });
//     await newFile.save();

//     // Update the user's pastPriscriptions array based on wallet address
//     const user = await User.findOneAndUpdate(
//       { walletAddress },
//       { $push: { pastPriscriptions: newFile.url } },
//       { new: true }
//     );

//     if (!user) return res.status(404).send('User not found.');

//     res.json({ file: newFile, message: 'File uploaded and patient record updated!' });
//   } catch (error) {
//     res.status(500).send('Failed to upload file.');
//   }
// });

// module.exports = router;

//correct code start here

const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const port = 8080;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Endpoint to handle file uploads
router.post('/upload', upload.single('file'), (req, res) => {
  const fileUrl = `http://localhost:8080/uploads/${req.file.filename}`;
  res.json({ fileUrl });
});

module.exports = router;


// // server.js or app.js
// const express = require('express');

// const multer = require('multer');
// const path = require('path');

// const router = express.Router();
// const upload = multer({ dest: 'uploads/' }); // Save files to 'uploads' directory

// router.post('/upload', upload.single('file'), (req, res) => {
//   const file = req.file;
//   if (!file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   const fileURL = `http://localhost:8080/uploads/${file.filename}`;
//   // Store fileURL in the blockchain here if needed
//   res.json({ fileURL });
// });

// module.exports = router;



