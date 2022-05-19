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