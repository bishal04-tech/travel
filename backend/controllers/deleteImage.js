const fs = require('fs');
const path = require('path');

exports.ImageDelete = async (req, res) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ success: false, message: 'No image URL provided' });
  }

  // Extract filename from URL
  const fileName = path.basename(imageUrl);

  // This is the full path to check/delete
  // ✅ CORRECT — looks inside "travel/uploads"
const filePath = path.join(__dirname, '../../uploads', fileName);


  
  fs.access(filePath, fs.constants.F_OK, err => {
    if (err) {
      console.error('❌ File not found at:', filePath);
      return res.status(404).json({ success: false, message: 'Image not found on server' });
    }

    fs.unlink(filePath, err => {
      if (err) {
        console.error('❌ Failed to delete image:', err);
        return res.status(500).json({ success: false, message: 'Failed to delete image' });
      }

      console.log('✅ Image deleted successfully:', filePath);
      return res.status(200).json({ success: true, message: 'Image deleted successfully' });
    });
  });
};
