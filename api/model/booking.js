const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    movieTitle : String,
    bookerName : String,
    screeningTime : String,
    screeningDate : Date,
    adultTickets : Number,
    childTickets : Number,
    totalPrice : Number,
});

Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;