const TravelStory = require('../models/travelStory.model');

exports.editTravelStory = async (req, res) => {
  const { id } = req.params; // Get the story ID from the request parameters
  const { title, story, visitedLocation, imageUrl, visitedDate } = req.body
    const { userId } = req.user; // Assuming userId is set in req.user by authentication middleware

     if (!title || !story || !visitedDate || !visitedLocation) {
            return res.status(400).json({
                success: false,
                message: 'Title, story, and visited date are required',
            });
        }
        const parsedVisitedDate = new Date(parseInt(visitedDate));


    try {
        // Find the travel story by ID and update it
        const updatedTravelStory = await TravelStory.findOneAndUpdate(
            { _id: id, userId }, // Ensure the userId matches to prevent unauthorized edits
            {
                title,
                story,
                visitedLocation: visitedLocation || [],
                visitedDate: parsedVisitedDate,
                imageUrl // Assuming image upload is handled elsewhere
            },
            { new: true } // Return the updated document
        );

        if (!updatedTravelStory) {
            return res.status(404).json({
                success: false,
                message: 'Travel story not found or you do not have permission to edit it',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Travel story updated successfully',
            travelStory: updatedTravelStory,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}