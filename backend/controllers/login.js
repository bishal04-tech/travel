const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Controller for user login
exports.login = async (req, res) => {
   try {
    const { email, password } = req.body;
   if (!email || !password) {
      return res.status(400).json({
         success: false,
         message: 'Email and password are required',
      });
   }
   const user = await User.findOne({ email });
   if (!user) { 
      return res.status(404).json({
         success: false,
         message: 'User not found',
      });
   }

    // Check password 
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({
            success: false,
            message: 'Invalid password. Please try again.',
        });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '120h' }
    );

   res.status(200).json({
      success: true,
        message: 'Login successful',
        user: {
            fullName: user.fullName,
            email: user.email,
            createdOn: user.createdOn,
        },
        accessToken
    })
   } catch (error) {
      console.error(error);
      res.status(500).json({
         success: false,
         message: error.message,
      });
    
   }
}   