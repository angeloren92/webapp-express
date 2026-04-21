// Simple Express server setup
const express = require('express');
const app = express();
// Load environment variables from .env file
require('dotenv').config();
// Server port (from .env or default 3000)
const port = process.env.PORT || 3000;
// Import application routes and middleware
const routes = require('./routes/movie_routes');
const pageNotFound = require('./middleware/pageNotFound');
const serverError = require('./middleware/serverError');
// CORS middleware to allow frontend requests
const cors = require('cors');

// Start the server and listen for requests
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Basic root route for quick check
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Enable CORS for the frontend origin defined in .env
app.use(cors({
    origin: process.env.FRONTENDED_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Serve static files from the public folder
app.use(express.static('public'));
// Parse JSON request bodies
app.use(express.json());
// Mount the movie API routes under /api/movies
app.use('/api/movies', routes);

// 404 handler for unknown routes
app.use(pageNotFound);
// Generic error handler
app.use(serverError);

