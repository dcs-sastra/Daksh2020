const express = require("express")
const router = express.Router();
const signUp = require('./signup');
const login = require('./login');
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

mongoose.connect(
process.env.DB_CONNECT,
{useNewUrlParser : true,useUnifiedTopology:true},
()=>console.log("connected to db"));

router.use('/login', login);
router.use('/signup', signUp);

module.exports = router;
