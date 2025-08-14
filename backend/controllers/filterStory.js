
const TravelStory = require('../models/travelStory.model');

exports.filterTravelStory = async (req, res) => {
    const {startDate, endDate} = req.query; // Assuming dates are passed as query parameters
    const {userId} = req.user; // Assuming userId is set in req.user
    const { isFavorite } = req.query; // Optional: if you want to filter by favorite stories
    if (!startDate || !endDate) {
        return res.status(400).json({
            success: false,
            message: 'Start date and end date are required',
        });
    }
    if(!userId) {
        return res.status(400).json({
            success: false,
            message: 'User ID is required',
        });
    }

    try {
        const start=new Date(parseInt(startDate));
        const end=new Date(parseInt(endDate));
        // Fetch travel stories for the user within the specified date range
        const filteredStories = await TravelStory.find({
            userId:userId,
            visitedDate: {
                $gte: start,
                $lte: end
            }
        }).sort({isFavorite: -1}); // Sort by visited date in descending order
        res.status(200).json({
            success: true,
            stories: filteredStories,
            message: 'Filtered travel stories retrieved successfully',
        });
    } catch (error) {
         console.error(error);
            res.status(500).json({
                success: false,
                message: "error occurred while filtering travel stories",
            });   
    }

}