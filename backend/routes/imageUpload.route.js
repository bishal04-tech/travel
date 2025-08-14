const express = require('express');
const router = express.Router();
const imageUpload = require('../controllers/ImageUpload');
const upload = require('../multer');



// Route for account creation
router.post('/image-upload',upload.single("image"),imageUpload.ImageUpload);

module.exports = router;
