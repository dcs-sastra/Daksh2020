const express = require('express');
const router = express.Router();
const register = require('./eventRegister');
const getEvents = require('./getEvents');


router.use('/register', register);
router.use('/', getEvents);




module.exports = router;
