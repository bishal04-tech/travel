const express = require('express');
const router = express.Router();
const getUserController = require('../controllers/getUser');
const {authenticateToken} = require('../utilities');
// Route for account creation
router.get('/', authenticateToken,getUserController.getUser);

module.exports = router;