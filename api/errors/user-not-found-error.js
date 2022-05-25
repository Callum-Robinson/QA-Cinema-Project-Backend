module.exports = class UserNotFoundError extends Error {

    constructor(id) {
        super(`User with id ${id} not found`);
        this.id = id;
    }
}