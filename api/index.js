const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const contactRouter = require("./router/contact-router");
const nodemailerConfig = require("./nodemailer-config.js");
const HttpError = require('./errors/http-error');
const MovieNotFoundError = require('./errors/movie-not-found-error');
const BookingNotFoundError = require('./errors/booking-not-found-error');

const movieRouter = require('./router/movie-router');
const bookingRouter = require('./router/movie-router');

const DB_URI = "mongodb://127.0.0.1:27017/qa-cinemas";
const PORT = 5000;
const app = express();

// Built in middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router middleware
app.use("/contactus", contactRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingRouter);

// Error handling middleware
app.use((error, request, response, next) => {
    console.error(error.message);

    if (!(error instanceof HttpError)) {
        if (error instanceof MovieNotFoundError) {
            error = new HttpError(error, 404);
        } else if (error.name === "ValidationError") {
            error = new HttpError(error, 404);
        } else {
            error = new HttpError(new Error("Something went wrong..."), 500);
        }
    }

    return response.status(error.statusCode).json({
        message: error.message,
        date: error.data
    })
});

// Wrapper used due to async..await not allowed in global scope
async function main() {
    // connect to the database
    await mongoose.connect(DB_URI, { useNewUrlParser : true, useUnifiedTopology: true })
                  .then(() => console.log(`DB Connected: ${DB_URI}`));

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error'));
    db.on('connection', console.log.bind(console, 'MongoDB connected'));

    // setup test email account
    await nodemailerConfig.initTestAccount();
    await nodemailerConfig.initContactEmail();
    // start server on port 5000
    const server = app.listen(PORT, function() {
        console.log(`Server up on ${PORT}`);
    });
}

// Call the main function with an error catch
main().catch(console.error);