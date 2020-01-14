const express = require('express');
const router = express.Router();
const getEvents = require('./GetEvents');
const postEvents = require('./AddEvents');


router.use('/', getEvents);
router.use('/add', postEvents);



module.exports = router;
