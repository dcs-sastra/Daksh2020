const express = require('express');
const router = express.Router();
const getEvents = require('./GetEvents');
const postEvents = require('./AddEvents');
const updateEvents = require('./UpdateEvent');
const deleteEvents = require('./DeleteEvent');
const verifyToken = require('../../middlewares/verifyToken');
const adminAccess = require('../../middlewares/adminAccess');



router.use('/', getEvents);
router.use('/', [verifyToken, adminAccess], [updateEvents, deleteEvents])
router.use('/add', [verifyToken, adminAccess], postEvents);


module.exports = router;
