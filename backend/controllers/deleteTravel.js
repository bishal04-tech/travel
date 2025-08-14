const TravelStory = require('../models/travelStory.model');

exports.deleteTravelStory = async (req, res) => {
   const { id } = req.params; // Get the story ID from the request parameters
   const { userId } = req.user; // Assuming userId is set in req.user by authentication middleware  
   try {
        // Find the travel story by ID and delete it
        const deletedTravelStory = await TravelStory.findOneAndDelete(
            { _id: id, userId } // Ensure the userId matches to prevent unauthorized deletions
        );
        

        if (!deletedTravelStory) {
            return res.status(404).json({
                success: false,
                message: 'Travel story not found or you do not have permission to delete it',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Travel story deleted successfully',
        });
    
   } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
   
}