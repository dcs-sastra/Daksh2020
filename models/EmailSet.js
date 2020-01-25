const { Schema, model } = require('mongoose');

const emailSchema = new Schema({
	to: String,
	status: String,
	err: Schema.Types.Mixed,
})

const emailSetSchema = new Schema({
	emails: [emailSchema],
	eventID: String,
	from: Schema.Types.Mixed,
	subject: String,
	text: String
})

const emailSetModel = model('emailSet', emailSetSchema);

module.exports = emailSetModel;