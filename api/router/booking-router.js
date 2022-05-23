const express = require('express');

const bookingController = require('../controller/booking-controller');
const router = express.Router();

// router.get('/', bookingController.getAllBookings);
router.get('/:id', bookingController.getBookingById);
router.post('/', bookingController.createBooking);
// router.put('/:id', bookingController.updateBooking);
// router.delete('/"id', bookingController.deleteBooking);

module.exports = router;