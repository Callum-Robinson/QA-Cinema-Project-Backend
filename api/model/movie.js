const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema ({
    title: String,
    genre: String,
    description: String,
    actors: String,
    directors: String,
    releaseYear: Number,
    runtime: Number,
    poster: {
        data: Buffer,
        contentType: String
    }

});

module.exports = mongoose.model('Movie', movieSchema);