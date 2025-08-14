const express = require('express');
const router = express.Router();
const editFav = require('../controllers/editFavourite');
const {authenticateToken} = require('../utilities');
// Route for account creation
router.put('/update-is-favourite/:id',authenticateToken, editFav.editFavStory);

module.exports = router;