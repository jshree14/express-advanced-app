const express = require('express');
const multer = require('multer');
const path = require('path');
const weatherRoute = require('./weather');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// File Upload Route
app.post('/upload', upload.single('myfile'), (req, res) => {
  res.json({
    message: 'File uploaded successfully!',
    file: req.file
  });
});

app.use('/weather', weatherRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
