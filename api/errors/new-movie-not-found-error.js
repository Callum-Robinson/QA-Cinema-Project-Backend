module.exports = class NewMovieNotFoundError extends Error {

    constructor(id) {
        super(`Movie with id ${id} not found`);
        this.id = id;
    }
}