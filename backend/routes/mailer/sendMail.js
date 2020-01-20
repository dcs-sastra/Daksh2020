const express = require("express");
const router = express.Router();
const { celebrate, Joi, errors } = require('celebrate');
const mailer = require('./mailerUtility');
const db = require('./db');

const mailPostSchema = {
	body: {
		eventID: Joi.string().required(),
		from: Joi.required(),
		subject: Joi.string().required(),
		text: Joi.string().required(),
	}
}

/**
 * @api_params eventID : String
 * @api_params from : Object({name: String, email: String}) or String
 * @api_params subject : String
 * @api_params text : String
 *
*/

router.post('/', celebrate(mailPostSchema), async (req, res) => {
	try {
		const recipients = await db.getRecipients(req.body.eventID);			

		const emails = recipients.map(recipient => {
			return {
				to: recipient,
				status: 'processing',
			}
		})

		const emailSetID = await db.initEmailStatuses({
			emails, 
			eventID: req.body.eventID,
			from: req.body.from,
			subject: req.body.subject,
			text: req.body.text
		});

		mailer.send({
			to: recipients,
			from: req.body.from,
			subject: req.body.subject,
			text: req.body.text,
			emailSetID

		});

		res.status(202).json({
			ok: true,
			message: "the request has been accepted and the emails are being sent"
		});

	} catch(err) {
		res.status(400).json(err);
	}

	

})

router.use(errors());

module.exports = router;