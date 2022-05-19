const express = require('express');
const contactController = require('../controller/contact-contoller');
const router = express.Router();

router.post('/', contactController.sendEmail);

module.exports = router;