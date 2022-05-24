const express = require('express');

const movieController = require('../controller/movie-controller');
const router = express.Router();

// Set up multer for storing files
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const upload = multer({ storage: storage });

router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);
router.post('/', upload.single('poster'), movieController.addMovies);

module.exports = router;