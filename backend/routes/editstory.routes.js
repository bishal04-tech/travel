const express = require('express');
const router = express.Router();
const editTravel = require('../controllers/editTravel');
const {authenticateToken} = require('../utilities');
// Route for account creation
router.put('/edit-story/:id',authenticateToken, editTravel.editTravelStory);

module.exports = router;