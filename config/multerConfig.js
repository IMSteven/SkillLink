// config/multerConfig.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the 'uploads' directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Use the correct callback 'cb' with (error, path)
    },
    filename: (req, file, cb) => { // Make sure 'req' is included as the first parameter
        cb(null, Date.now() + '-' + file.originalname); // Add timestamp to avoid filename collisions
    }
});

// Initialize multer with file filters
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Accept only images and PDFs
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG, PNG images, and PDF files are allowed'), false);
        }
    }
});

module.exports = upload;
