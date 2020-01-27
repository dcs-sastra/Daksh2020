const express = require('express')
const { celebrate, Joi, errors } = require('celebrate');
const Events = require('../../models/Events');
const router = express.Router();


const schema = {
  body: {
    _id: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    eventDate: Joi.string().default(new Date().toISOString),
    venue: Joi.string().required(),
    poster: Joi.string().required(),
    problemStatement: Joi.string().required(),
    prize: Joi.number()
  }
}

/**
 * To use this API first get the user data, then resend the data.
 * @api_params title : String
 * @api_params description : String
 * @api_params eventDate : Date(String format)
 * @api_params venue : String
 * @api_params poster : String
 * @api_params problemStatement : String
 * @api_params prize : Number
*/


router.put('/', celebrate(schema), async (req, res) => {
  try {
    const data = await Events.findByIdAndUpdate(req.body._id, {
      ...req.body
    }, { useFindAndModify: true });
    if (data === null || data === undefined) {
      throw new Error("Note not found, please check the ID");
    }
    res.status(200).json({
      ok: true,
      message: "1 record updated.",
      event: data
    });
  } catch (error) {
    console.error(error)
    res.status(500).json({
      ok: false,
      message: "Something went wrong! Please try again",
      error: error.message
    });
  }
})

router.use(errors());


module.exports = router;
