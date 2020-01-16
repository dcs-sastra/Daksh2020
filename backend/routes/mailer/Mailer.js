const express = require('express');
const router = express.Router();
const sendMail = require('./sendMail');

router.use('/send', sendMail);

module.exports = router;