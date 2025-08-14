const express = require('express');
const router = express.Router();
const imageDelete = require('../controllers/deleteImage');
const upload = require('../multer');



// Route for account creation
router.delete('/image-delete',imageDelete.ImageDelete);

module.exports = router;
