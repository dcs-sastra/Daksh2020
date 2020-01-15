const express = require('express');
const router = express.Router();
const getEvents = require('./GetEvents');
const postEvents = require('./AddEvents');
const updateEvents = require('./UpdateEvent');
const deleteEvents = require('./DeleteEvent');


router.use('/', [getEvents, updateEvents, deleteEvents]);
router.use('/add', postEvents);


module.exports = router;
