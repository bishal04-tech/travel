const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Route for account creation
router.post('/create-account', authController.createAccount);

module.exports = router;