const ScreeningNotFoundError = require('../errors/screening-not-found-error');
const Screening = require('../model/screening');

module.exports = {

    // READ
    getScreeningById: async (req, res, next) => {
        const id = req.params.id;
        const screening = await Screening.findById(id);

        if (screening) {
            res.status(200).json(screening);
            return;
        }
        next(new ScreeningNotFoundError(id));
    }
}