const express = require('express');
const router = express.Router();
const path = require('path');
const upload = require('../middleware/multerStorage')

router.post('/uploadFile', upload.single('file'), (req, res) => {
    if (!req.file) {
        console.log('No file uploaded');
        res.status(400).json({ success: false, message: 'No file uploaded' });
        return;
    }
    console.log("Uploaded file:", req.file.filename);
    res.status(200).json({ success: true, filename: req.file.filename });
});

router.get('/images/:filename', upload.single('file'), (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '..', 'images', filename);
    res.sendFile(filePath);
});

module.exports = router;