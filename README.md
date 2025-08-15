TRAVEL STORIES APP

A simple Travel Stories web application — React frontend + Node/Express backend + MongoDB.
Users can register/login, create travel stories with images, search & filter stories, and mark favourites. Images are uploaded and served from /uploads.

FEATURES

User registration & login

Create / Read / Update / Delete travel stories

Image upload & delete

Search and filter stories

Mark stories as favourite

Static assets served from /assets

Tech Stack

Frontend: React 

Backend: Node.js, Express

Database: MongoDB (Mongoose)

Image storage: local /uploads and/or Cloudinary 

Authentication: JWT 

Quick links

Server entry: index.js (root)

Routes: routes/ (listed below)

Static folders: /uploads, /assets

Environment Variables

Created a .env file in the project root. Common variables used by the project :

MONGO_URI=your_mongodb_connection_string
PORT=3000               
JWT_SECRET=your_jwt_key  
CLOUDINARY_CLOUD_NAME=...  
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

API Routes 

These endpoints reflect how routes are mounted in index.js

Auth & Login

POST /api/create-account
Create a new user account. (from routes/auth.routes.js mounted at /api/)

POST /api/login
Login (from routes/login.routes.js mounted at /api/login)

Generic GET

GET /api/get/
Generic GET route(s) from routes/get.routes.js (mounted at /api/get)

Story CRUD

POST /add-travel-story
Add a new travel story. (routes/addstory.routes.js)

GET /get-all-stories
Retrieve all stories. (routes/getAllStories.routes.js)

PUT /edit-story/:id
Edit/update a story by id. (routes/editstory.routes.js)

DELETE /delete-story/:id
Delete a story by id. (routes/deletestory.routes.js)

Image upload / delete

POST /image-upload
Upload an image (Multer / Cloudinary). (routes/imageUpload.route.js)

DELETE /image-delete
Delete an uploaded image (expects image id or URL). (routes/deletImage.route.js)

Favourites, search, filter

PUT /update-is-favourite/:id
Toggle/update favourite flag for a story. (routes/updateFav.routes.js)

GET /search
Search stories (use query params). (routes/searchStory.routes.js)

GET /travel-stories/filter
Filter stories (use query params). (routes/filterStory.routes.js)


PROJECT FOLDER STRUCTURE

```travel/
├── backend/ 
│   ├── controllers/
│   ├── models/ 
│   ├── routes
│   ├── middleware/
│   ├── config/ 
│   ├── utils/ 
│   ├── package.json
│   └── index.js
└── travel-story-app/ # client-side (React)
    ├── public/
    └── src/
        ├── assets/
        ├── components/
        ├── pages/
        │   ├── Auth/
        │   └── Home/
        ├── utils/
        │   ├── axiosInstance.js 
        │   ├── constants.js 
        │   ├── helper.js 
        │   └── uploadImage.js 
        ├── App.jsx
        ├── index.css
        └── main.jsx```
