const express = require("express")
const router = express.Router();
const signUp = require('./signup');
const login = require('./login');

router.use('/login', login);
router.use('/signup', signUp);

module.exports = router;
