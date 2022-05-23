const MovieNotFoundError = require('../errors/movie-not-found-error.js');
const Movie = require('../model/movie.js');

module.exports = {
    
    // READ ALL
    getAllMovies: async (req, res, next) => {
        const movies = await Movie.find({});
        res.status(200).json(movies);
    },

    // READ
    getMovieById: async (req, res, next) => {
        const id = req.params.id;
        const movie = await Movie.findById(id);

        if (movie) {
            res.status(200).json(movie);
            return;
        }
        next(new MovieNotFoundError(id));
    }
}