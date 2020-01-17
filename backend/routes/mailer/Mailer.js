const express = require('express');
const router = express.Router();
const sendMail = require('./sendMail');
const getStatus = require('./getStatus');

router.use('/send', sendMail);
router.use('/getStatus', getStatus);

module.exports = router;