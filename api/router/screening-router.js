const express = require('express');

const screeningController = require('../controller/screening-controller');
const router = express.Router();

router.get('/', screeningController.getScreeningById);

module.exports = router;