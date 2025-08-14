const TravelStory = require('../models/travelStory.model'); // Adjust the path as necessary
// Assuming you have a TravelStory model defined
exports.getAllStories = async (req, res) => {
     const { userId } = req.user; // Assuming userId is set in req.user by authentication middleware
     try {
        // Fetch all travel stories for the user, sorted by isFavorite
        // and populate user details
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required',
            });
        }
        const travelStories = await TravelStory.find({ userId }).sort({ isFavorite: -1 }); //
          res.status(200).json({
            success: true,
            stories: travelStories,
            message: 'Travel stories retrieved successfully',
          })
     } 
     catch (error) {
           console.error(error);
            res.status(500).json({
                success: false,
                message: error.message,
            });   
     }
}
