const express = require('express');
const router = express.Router();
const user = require('./user');
const event = require('./Events')

router.use('/user', user);
router.use('/event', event);

module.exports = router;
