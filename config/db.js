const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { DB_URL, DB_NAME } = require('./CONSTS.json');

const paymentSchema = new Schema({
    fullName: { type: String, required: true },
    cardType: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    CVC: { type: Number, required: true },
    postcode : {type : String, required: true}
});
const Payment = model(`Payment`, paymentSchema);

const commentSchema = new Schema({

    name: { type: String, required: true },
    comment: { type: String, required: true },
    datePosted: { type: Date, default: Date.now }

});
const Comment = model(`Comment`, commentSchema);

const BookingSchema = new Schema({

    moviename: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    bookername: { type: String, required: true },
    adultseats: { type: Number, required: true, min: 0 },
    childseats: { type: Number, required: true, min: 0 },
    deluxe : {type: String, required: true},
    totalCost : {type: String, required: true}

});
const Booking = model('Booking', BookingSchema);

const discussionSchema = new Schema({

    name: { type: String, required: true },
    movie: { type: String },
    topic: { type: String },
    discussion: { type: String },
    rating: { type: Number, min: 1, max: 10 }

});

const Discuss = model('Discuss', discussionSchema);

module.exports = {
    "Payment": Payment,
    "Booking": Booking,
    "Discuss": Discuss,
    "Comment": Comment
}