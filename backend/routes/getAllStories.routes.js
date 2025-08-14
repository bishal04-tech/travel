const express = require('express');
const router = express.Router();
const getStories = require('../controllers/getAllStories');
const {authenticateToken} = require('../utilities');
// Route for account creation
router.get('/get-all-stories', authenticateToken,getStories.getAllStories);

module.exports = router;
