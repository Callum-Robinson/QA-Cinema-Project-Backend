const BookingNotFoundError = require('../errors/booking-not-found-error.js')
const Booking = require('../model/booking');

module.exports = {

    // READ ALL
    getAllBookings: async (req, res, next) => {
        const bookings = await Booking.find({});
        res.status(200).json(bookings);
    },

    // READ BY ID
    getBookingById: async (req, res, next) => {
        const id = req.params.id;
        const booking = await Booking.findBookingById(id);
        if (booking) {
            res.status(200).json(booking);
            return;
        }
        next(new BookingNotFoundError(id));
    },

    // CREATE
    createBooking: async (req, res, next) => {
        const booking = new Booking(req.body);

        try {
            await booking.save();
            res.status(200).json(booking);
        } catch (error) {
            next(error);
        }
    },

    // // UPDATE
    // updateBooking: async (req, res, next) => {
    //     const id = req.params.id;
    //     const updates = req.body;

    //     const booking = await Booking.updateOne({ _id: id }, updates);

    //     if (booking) {
    //         res.status(200).json(booking);
    //         return;
    //     }
    //     next(new BookingNotFoundError(id));
    // },

    // //DELETE
    // deleteBooking: async (req, res, next) => {
    //     const filter = { _id: req.params.id };

    //     const booking = await Booking.findOneAndDelete(filter);

    //     if (booking) {
    //         return res.status(200).json(booking);
    //     }
    //     next(new BookingNotFoundError(id));
    // }
}