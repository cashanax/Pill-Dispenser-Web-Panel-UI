const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000; // Change this to your desired port

// Set up storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit
}).single('image');

// Ensure upload directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Handle file upload
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: 'File upload failed', error: err.message });
    }
    res.status(200).json({ message: 'File uploaded successfully', filePath: `/uploads/${req.file.filename}` });
  });
});

// Endpoint to list all uploaded images
app.get('/images', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to list images', error: err.message });
    }
    const imageUrls = files.map(file => `/uploads/${file}`);
    res.status(200).json({ images: imageUrls });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
