const express = require("express")
const router = express.Router();
const User = require('../../model/User')
const bcrypt = require('bcryptjs')

router.get('/',async (req, res) => {
  const emailExist =await User.findOne({email:req.body.email})
  if(emailExist) return res.status(400).send('Email already exists')

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword,
        college:req.body.college,
        regNo:req.body.regNo,
        year:req.body.year
    })

    try{
        const savedUser = await user.save()
        res.json(savedUser)
    }catch(err){
        res.status(400).send(err)
    }
});

module.exports = router;
