
const User = require('../models/user.model');
exports.getUser = async (req, res) => {
  try {
    const {userId} = req.user; // Assuming userId is set in req.user by authentication middleware
    const user = await User.findById(userId).select('-password'); // Exclude password from response

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
        message: 'User retrieved successfully',
      user: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}