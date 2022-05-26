const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newMovieSchema = new Schema ({
    title: String,
    genre: String,
    description: String,
    actors: String,
    directors: String,
    releaseDate: String,
    runtime: Number,
    poster: {
        data: String,
        contentType: String
    }
});

module.exports = new mongoose.model('NewMovie', newMovieSchema);