const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScreeningSchema = new Schema({
    date: Date,
    screenNumber: Number,
    numOfSeats: Number,
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    },
    booking: {
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }
})

const Screening = mongoose.model('Screening', ScreeningSchema);

module.exports = Screening;