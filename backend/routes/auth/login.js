const express = require("express")
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../../models/User')
const { celebrate, Joi, errors } = require('celebrate')

const loginSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }).required()
}



router.post('/', celebrate(loginSchema), async (req, res) => {
  try {

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email does not exist')
    const isPassword = await bcrypt.compare(req.body.password, user.password)
    if (isPassword)
      res.status(201).json({ ...user._doc, password: null, ok: true, message: "Login Success!" });
    else
      return res.status(400).send("Invalid Credentials")

  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "Something went wrong",
      error: error.message
    })
  }

});

router.use(errors())

module.exports = router;
