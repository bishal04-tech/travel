const TravelStory = require('../models/travelStory.model');

exports.searchTravelStory = async (req, res) => {
     const { userId } = req.user; // Assuming userId is set in req.user by authentication middleware
     const { searchQuery } = req.query; // Assuming search query is sent in the request

     if(!userId) {
         return res.status(400).json({
             success: false,
             message: 'User ID is required',
         });
     }

     if(!searchQuery) {
         return res.status(400).json({
             success: false,
             message: 'Search query is required',
         });
     }
        
     try {
        const searchResults = await TravelStory.find({
            userId:userId,
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search in title
                { story: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search in story
                { visitedLocation: { $regex: searchQuery, $options: 'i' } } // Case-insensitive search in visitedLocation
            ]}).sort({ isFavorite: -1 }); // Sort by isFavorite
            if (searchResults.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No travel stories found matching the search criteria',
                });
            }
            res.status(200).json({
                success: true,
                stories: searchResults,
                message: 'Travel stories retrieved successfully',
            });
     } catch (error) {
        success: false,
         console.error(error);
         res.status(500).json({
             success: false,
             message: "error searching travel stories",
         });
     }
}