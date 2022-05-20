module.exports = class BookingNotFoundError extends Error {

    constructor(id) {
        super(`Booking not found with id ${id}`);
        this.id = id;
    }
}