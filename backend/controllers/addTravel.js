const TravelStory = require('../models/travelStory.model');

exports.addTravelStory = async (req, res) => {
    try {
        const { title, story, visitedLocation,imageUrl,visitedDate } = req.body;
        const {userId} = req.user; // Assuming userId is set in req.user by authentication middleware

        if (!title || !story || !visitedDate ||!imageUrl || !visitedLocation) {
            return res.status(400).json({
                success: false,
                message: 'Title, story, and visited date are required',
            });
        }
        const parsedVisitedDate = new Date(parseInt(visitedDate));
        const newTravelStory = new TravelStory({
            title,
            story,
            visitedLocation: visitedLocation || [],
           
            userId,
            visitedDate: parsedVisitedDate,
            imageUrl // Assuming image upload is handled elsewhere
        });

        await newTravelStory.save();

        res.status(201).json({
            success: true,
            message: 'Travel story added successfully',
            travelStory: newTravelStory,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
