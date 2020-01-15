const express = require("express")
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../../model/User')

router.get('/',async (req, res) => {
  const user =await User.findOne({email:req.body.email})
  if(!user) return res.status(400).send('Email does not exist')
  
  const isPassword =await bcrypt.compare(req.body.password, user.password)

  if(isPassword)
  res.json(user);

  else
  return res.status(400).send("Wrong Password")

});

module.exports = router;
