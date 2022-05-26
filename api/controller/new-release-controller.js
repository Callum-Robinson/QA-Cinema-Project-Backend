const NewMovieNotFoundError = require('../errors/new-movie-not-found-error.js');
const NewRelease = require("../model/newMovie.js");

const fs = require("fs");
const path = require("path");

module.exports = {

    // Read all
    getAllNewReleases: async (req, res, next) => {
        const releases = await NewRelease.find({});
        res.status(200).json(releases);
    },

    // Read by id
    getNewReleaseById: async (req, res, next) => {
        const id = req.params.id;
        const release = await NewRelease.findById(id);

        if (release) {
            res.status(200).json(release);
            return;
        }
        next(new NewMovieNotFoundError(id));
    },

    // Post Movies
    addNewRelease: async (req, res, next) => {

        const image = fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename));
        const encodedImage = image.toString("base64");

        const release = {
            title: req.body.title,
            genre: req.body.genre,
            classification: req.body.classification,
            description: req.body.description,
            actors: req.body.actors,
            directors: req.body.directors,
            releaseDate: req.body.releaseDate,
            runtime: req.body.runtime,
            poster: {
                data: encodedImage,
                contentType: req.file.mimetype
            }
        }

        NewRelease.create(release, (err, item) => {
            if (err) {
                console.log(err);
            } else {
                fs.unlinkSync(req.file.path);
                res.json(item);
            }
        })
    },

    // Delete New Release
    deleteNewRelease: async (req, res, next) => {
        const id = req.params.id;
        const release = await NewRelease.findByIdAndDelete(id);

        if (release) {
            return res.status(200).json(release);
        }
        next(new NewMovieNotFoundError(id));
    }
}