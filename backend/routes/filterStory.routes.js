const express = require('express');
const router = express.Router();
const filterStory = require('../controllers/filterStory');
const {authenticateToken} = require('../utilities');
// Route for account creation
router.get('/travel-stories/filter',authenticateToken, filterStory.filterTravelStory);

module.exports = router;