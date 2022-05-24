const MovieNotFoundError = require('../errors/movie-not-found-error.js');
const Movie = require('../model/movie.js');

const fs = require("fs");
const path = require("path");

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
    },

    addMovies: async (req, res, next) => {

        const image = fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename));
        const encodedImage = image.toString("base64");

        const movie = {
            title: req.body.title,
            genre: req.body.genre,
            description: req.body.description,
            actors: req.body.actors,
            directors: req.body.directors,
            releaseYear: req.body.releaseYear,
            runtime: req.body.runtime,
            poster: {
                data: encodedImage, //Buffer.from(encodedImage, "base64"),
                contentType: req.file.mimetype
            }
        }

        Movie.create(movie, (err, item) => {
            if (err) {
                console.log(err);
            } else {
                fs.unlinkSync(req.file.path);
                //item.poster.data = item.poster.data.toString("base64");
                //console.log(item.poster.data.toString("base64"));
                res.json(item);
            }
        })
    }
}