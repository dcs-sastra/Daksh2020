const express = require('express');
const Event = require('../../models/Events');
const { celebrate, Joi, errors } = require('celebrate');
const router = express.Router();

const eventPostSchema = {
  body: {
    title: Joi.string().required(),
    description: Joi.string().required(),
    eventDate: Joi.string().default(new Date().toISOString),
    venue: Joi.string().required(),
    poster: Joi.string().required()
  }
}

/**
 * @api_params title : String
 * @api_params description : String
 * @api_params eventDate : Date(String format)
 * @api_params venue : String
 * @api_params poster : String
 *
*/

router.post('/', celebrate(eventPostSchema), async (req, res) => {
  try {
    const newEvent = new Event({
      ...req.body
    });
    const ret = await newEvent.save();
    res.status(201).json({
      ok: true,
      message: "New event added.",
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
