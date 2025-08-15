// // controllers/ImageUpload.js
// exports.ImageUpload = async (req, res) => {
//   // Multer will populate req.file when the upload succeeds
//   if (!req.file) {
//     return res
//       .status(400)
//       .json({ success: false, message: 'No image uploaded' });
//   }
//    console.log('File:', req.file);
// console.log('Body:', req.body);
//   // Build a URL the client can use to fetch the image
//   const baseUrl  = `${req.protocol}://${req.get('host')}`;
//   const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;

//   // Send back only the public-facing URL
//   return res.status(201).json({
//     success: true,
//     message: 'Image uploaded successfully',
//     imageUrl
//   });
// };


// controllers/ImageUpload.js
const { uploadOnCloudinary } = require('../cloudinary');
const fs = require('fs');

exports.ImageUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No image uploaded'
    });
  }

  try {
    console.log('File:', req.file);
    console.log('Body:', req.body);

    // Upload to Cloudinary using the local file path
    const cloudinaryResult = await uploadOnCloudinary(req.file.path);

    // Remove local file after upload
    fs.unlinkSync(req.file.path);

    if (!cloudinaryResult) {
      return res.status(500).json({
        success: false,
        message: 'Failed to upload image to Cloudinary'
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: cloudinaryResult.secure_url
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
