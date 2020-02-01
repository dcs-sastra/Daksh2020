const router = require('express').Router();
const SubscribeEmail = require('../../models/subscribeEmail');
const { celebrate, Joi, errors } = require('celebrate')


const subscribeEmailSchema = {
  body: {
      email: Joi.string().required(),
  }
}

router.post('/', celebrate(subscribeEmailSchema), async (req, res) => {
    try {
      const newSubscribeEmail = new SubscribeEmail({
        email: req.body.email,
      });
      const ret = await newSubscribeEmail.save();
      console.log("here2");
      res.status(201).json({
        ok: true,
        message: "Subscribed Successfully.",
        event: ret
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        message: "Unkown Error! Please try again."
      })
    }
  })
  
  
  router.post(errors());
  
  
  module.exports = router;
  