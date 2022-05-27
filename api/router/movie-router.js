const express = require('express');

const movieController = require('../controller/movie-controller');
const router = express.Router();

// Set up multer for storing files
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './api/controller/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({ storage: storage });

// listing gallery routes
router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);

// routes to add/delete movies to/from the database
router.post('/', upload.single('poster'), movieController.addMovies);
router.delete('/:id', movieController.deleteMovies);

// route to add timings to movies
router.put('/timings/:id', movieController.addScreeningsById);

module.exports = router;