const express = require('express');
const contactController = require('../controller/contact-controller');
const router = express.Router();

// post route for sending email for contact form
router.post('/', contactController.sendEmail);

module.exports = router;