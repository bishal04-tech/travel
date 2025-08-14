const express = require('express');
const router = express.Router();
const searchStory = require('../controllers/searchStory');
const {authenticateToken} = require('../utilities');
// Route for account creation
router.get('/search',authenticateToken, searchStory.searchTravelStory);

module.exports = router;