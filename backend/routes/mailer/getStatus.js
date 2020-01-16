const express = require("express");
const router = express.Router();
const mailer = require('./mailerUtility');
const db = require('./db');

/**
 * @api_params eventID : String
 *
*/

router.get('/', async (req, res) => {
	db.getEmailStatuses(req.params.eventID)
		.then(emailStatuses => res.status(200).send(emailStatuses))
		.catch(err => res.status(400).send(err));
})

module.exports = router;