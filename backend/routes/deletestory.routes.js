const express = require('express');
const router = express.Router();
const deleteTravel = require('../controllers/deleteTravel');
const {authenticateToken} = require('../utilities');
// Route for account creation
router.delete('/delete-story/:id',authenticateToken, deleteTravel.deleteTravelStory);

module.exports = router;