const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timingsSchema = new Schema ({
    screeningDay: String,
    screeningTimes: {
        type: Array,
        items: {
            type: String
        }
    }
})

const movieSchema = new Schema ({
    title: String,
    genre: String,
    classification: String,
    description: String,
    actors: String,
    directors: String,
    releaseYear: Number,
    runtime: Number,
    poster: {
        data: String,
        contentType: String
    },
    timings: [timingsSchema]

});

module.exports = new mongoose.model('Movie', movieSchema);