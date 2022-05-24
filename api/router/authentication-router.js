/**
 * Taken from MrWalshyType2
 */

 const express = require('express');
 const bcrypt = require('bcryptjs');
 const router = express.Router();
 const User = require('../model/user');
 const jwtUtils = require('./JwtUtils');
 const { authenticationMiddleware } = require('./JwtUtils');
 const expiration = jwtUtils.JWT_TIMEOUT;
 
 /**
  * Allows for a JWT to be refreshed if you are currently hold a valid JWT and 
  * a refresh token cookie.
  */
 router.post('/refresh', authenticationMiddleware, jwtUtils.refreshAccessTokenMiddleware);
 
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
            console.log(user);
         if (user) {
             if (await bcrypt.compare(password, user.password)) {
                 user.password = undefined;
                 const token = jwtUtils.generateAccessToken(user.username, user.role);
                 // add refresh token cookie
                 response.cookie('refreshToken', jwtUtils.generateRefreshToken(user.username, user.role), {
                     httpOnly: true, // forbid js from accessing the cookie
                     sameSite: 'None', // allow sending cookie to cross-site and same-site requests
                     secure: false, // requires a secure context (true) when same-site = None, set to false for development as otherwise cookies only sent via HTTPS, not HTTP
                     domain: 'localhost', // domain for which the cookie can be sent
                     path: '/', // valid base path, matches all subroutes
                     maxAge: 1000 * 60 * 60 * 24 // max age of 24 hours
                 });
 
                 return response.status(200).json({ token, expiration, user });
             }
         }
         return response.status(400).send("Invalid login details.");
 
     } catch (err) {
         console.log(err);
         return next(err);
     }
 });
 
 module.exports = router;
