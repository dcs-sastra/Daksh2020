const { Schema, model } = require('mongoose');

const subscribeEmailSchema = new Schema({
	email: String,
})

const subscribeEmailModel = model('SubscribeEmail', subscribeEmailSchema);

module.exports = subscribeEmailModel;