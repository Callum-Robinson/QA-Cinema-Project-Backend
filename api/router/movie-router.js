const express = require('express');

const movieController = require('../controller/movie-controller');
const router = express.Router();

router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);

module.exports = router;