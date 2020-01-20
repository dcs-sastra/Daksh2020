const EmailSet = require('../../models/EmailSet');

async function getRecipients(eventID) {
	// Needs to be updated
	return ["ramvard@gmail.com", "ramvardev"];
}

async function handleEmailSent(_id, to) {
	const email = await EmailSet.findOneAndUpdate({
		_id,
		'emails.to': to
	}, {
		'emails.$.status': "delivered",
		'emails.$.err': ""
	})
}

async function handleEmailError(_id, to, custom_msg, err="") {
	const email = await EmailSet.findOneAndUpdate({
		_id,
		'emails.to': to
	}, {
		'emails.$.status': "failed",
		'emails.$.err': {
			custom_msg,
			err
		}
	})
}

async function initEmailStatuses(obj) {
	const newSet = new EmailSet({
		...obj
	})

	const ret = await newSet.save();
	return ret._id;
}

async function getEmailStatuses(eventID) {
	const emailSet = await EmailSet.find(eventID);
	return emailSet;
}

module.exports = {getRecipients, handleEmailError, handleEmailSent, initEmailStatuses, getEmailStatuses};