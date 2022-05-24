/**
 * Taken from MrWalshyType2
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../model/user');
const jwtUtils = require('../config/JwtUtils');
const { authenticationMiddleware } = require('../config/JwtUtils');
const expiration = jwtUtils.JWT_TIMEOUT;

/**
 * Allows for a JWT to be refreshed if you are currently hold a valid JWT.
 */
router.post('/refresh', authenticationMiddleware, async (request, response, next) => {
    const user = request.user;
    const token = jwtUtils.generateAccessToken(user.username, user.role);
    response.setHeader('Authorization', token);
    return response.status(200).json({ token, expiration, user });
});

/** 
* This route creates a new user from the passed in request body or returns an appropriate error.
*/
router.post('/register', async (request, response, next) => {
    try {
        const user = new User({ ...request.body });

        const isUser = await User.findOne({ $or: [
            { username: user.username },
            { email: user.email }
        ]});

        if (isUser) {
            return response.status(409).send("User already exists!");
        }

        await user.save();

        return response.status(201).json(`User ${user.username} created successfully, please log in.`);
    } catch (err) {
        return next(err);
    }
});

/**
 * This route is used to login to the API, provided valid credentials a Json Web Token (JWT) will
 * be provided for future interactions with the API.
 */
router.post('/login', async (request, response, next) => {
    try {
        const { username, password } = request.body;

        if (!(username) || !(password)) {
            return response.status(400).send("Incomplete login fields.");
        }

        // ensure to select the pw from the db for the comparison
        const user = await User.findOne({ username }).select('+password');

        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                user.password = undefined;
                const token = jwtUtils.generateAccessToken(user.username, user.role);
                response.setHeader('Authorization', token);

                return response.status(200).json({ token, expiration, user });
            }
        }
        return response.status(400).send("Invalid login details.");

    } catch (err) {
        return next(err);
    }
});

module.exports = router;