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

        if (movie) {
            res.status(200).json(release);
            return;
        }
        next(new NewMovieNotFoundError(id));
    },
}