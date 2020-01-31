const express = require("express")
const router = express.Router();
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const { celebrate, Joi, errors } = require('celebrate');

const schema = {
    body: {
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        college: Joi.string().required(),
        regNo: Joi.string().required(),
        year: Joi.number().required(),
        role: Joi.string()
    }
}

router.post('/', celebrate(schema), async (req, res) => {
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send('Email already exists')

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        college: req.body.college,
        regNo: req.body.regNo,
        year: req.body.year,
        role: req.body.role || "User"
    })

    try {
        const savedUser = await user.save()
        res.json({ ...savedUser._doc, password: null, ok: true, message: "New User added sucessfully" })
    } catch (err) {
        res.status(400).send(err)
    }
});

router.use(errors());
module.exports = router;
