const express = require('express');

const screeningController = require('../controller/screening-controller');
const router = express.Router();

router.get('/:id', screeningController.getScreeningById);

module.exports = router;