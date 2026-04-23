// Movie routes
const express = require('express');
const router = express.Router();
// Controller that handles the movie logic
const movie_controller = require('../controllers/movie_controller');

// GET /api/movies/index -> list all movies
router.get('/index', movie_controller.index);
// GET /api/movies/:id -> show single movie with reviews
router.get('/:id', movie_controller.show);

router.post('/:id/reviews', movie_controller.addReview);

module.exports = router;