


// app.js
require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

// serve static uploaded files (read-only on Vercel, ephemeral at runtime)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Import routes
const authRoutes = require('./routes/auth.routes');
const loginRoutes = require('./routes/login.routes');
const getRoutes = require('./routes/get.routes');
const addStoryRoutes = require('./routes/addstory.routes');
const getAllStoriesRoutes = require('./routes/getAllStories.routes');
const imageUploadRoutes = require('./routes/imageUpload.route');
const imageDeleteRoutes = require('./routes/deletImage.route');
const editStoryRoutes = require('./routes/editstory.routes');
const deleteStoryRoutes = require('./routes/deletestory.routes');
const editFavRoutes = require('./routes/updateFav.routes');
const searchStoryRoutes = require('./routes/searchStory.routes');
const filterStoryRoutes = require('./routes/filterStory.routes');

// Connect to MongoDB (will run on import — avoid excessive reconnects in serverless,
// but this works as a starting point; see notes below about connection reuse)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mount routes
app.use('/api/', authRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/get', getRoutes);
app.use('/', addStoryRoutes);
app.use('/', getAllStoriesRoutes);
app.use('/', imageUploadRoutes);
app.use('/', imageDeleteRoutes);
app.use('/', editStoryRoutes);
app.use('/', deleteStoryRoutes);
app.use('/', editFavRoutes);
app.use('/', searchStoryRoutes);
app.use('/', filterStoryRoutes);

// Health endpoints
app.get('/', (req, res) => res.send('Welcome to the Travel API!'));
app.post('/api/test', (req, res) => res.json({ message: 'Test API is working!' }));

// Export app (do NOT call app.listen here)
module.exports = app;
