const TravelStory = require('../models/travelStory.model');

exports.editFavStory = async (req, res) => {
       const { id } = req.params; // Get the story ID from the request parameters
       const { isFavorite } = req.body; // Get the isFavorite status from the request
       const { userId } = req.user; // Assuming userId is set in req.user by authentication middleware

       try {
        const updatedTravelStory = await TravelStory.findOneAndUpdate(
  { _id: id, userId },
  { isFavorite },
  { 
    new: true,          // ← return the *updated* document
    runValidators: true // ← optional, if you want to enforce your schema validators
  }
);

if (!updatedTravelStory) {
  return res.status(404).json({
    success: false,
    message: 'Travel story not found or you do not have permission to edit it',
  });
}

res.status(200).json({
  success: true,
  message: 'Favorite status updated successfully',
  travelStory: updatedTravelStory,
});

    
    } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "An error occurred while updating the favorite status",
            });
        
       }

       
}