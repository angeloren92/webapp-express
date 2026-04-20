const express = require('express');
const router = express.Router();
const movie_controller = require('../controllers/movie_controller');

router.get('/index', movie_controller.index);
router.get('/:id', movie_controller.show);

module.exports = router;