const express = require('express');
const router = express.Router();
const addTravel = require('../controllers/addTravel');
const {authenticateToken} = require('../utilities');
// Route for account creation
router.post('/add-travel-story',authenticateToken, addTravel.addTravelStory);

module.exports = router;