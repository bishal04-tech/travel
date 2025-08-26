require('dotenv').config();
const config = require('./config.json');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(express.json());
app.use(cors());
  const PORT=process.env.PORT || 3000;
// Import routes
const authRoutes = require('./routes/auth.routes');
const loginRoutes = require('./routes/login.routes');
const getRoutes = require('./routes/get.routes');

const addStoryRoutes = require('./routes/addstory.routes');

const getAllStoriesRoutes = require('./routes/getAllStories.routes');


// Serve the uploaded files statically:


const imageUploadRoutes = require('./routes/imageUpload.route');
const imageDeleteRoutes = require('./routes/deletImage.route');
const editStoryRoutes = require('./routes/editstory.routes');

const deleteStoryRoutes = require('./routes/deletestory.routes');
// Connect to MongoDB
const editFavRoutes = require('./routes/updateFav.routes');
const searchStoryRoutes = require('./routes/searchStory.routes');
const filterStoryRoutes = require('./routes/filterStory.routes');
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));



// Mount auth routes under /api/auth
app.use('/api/', authRoutes);
// Mount login routes under /api/login
app.use('/api/login', loginRoutes);
app.use('/api/get', getRoutes);
app.use('/', addStoryRoutes);
app.use('/',getAllStoriesRoutes);
app.use('/', imageUploadRoutes);
app.use('/', imageDeleteRoutes);
app.use('/', editStoryRoutes);
app.use('/', deleteStoryRoutes);
app.use('/', editFavRoutes);
app.use('/', searchStoryRoutes);
app.use('/', filterStoryRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));


app.get('/', (req, res) => res.send('Welcome to the Travel API!'));
app.post('/api/test', (req, res) => res.json({ message: 'Test API is working!' }));

app.listen(PORT,"0.0.0.0", () => console.log(`Server is running on port ${PORT}`));

module.exports = app;