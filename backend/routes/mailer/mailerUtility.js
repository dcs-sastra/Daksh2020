const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const db = require('./db');

function handleErrors(err, sendObj) {
	if(err.code >= 200 && err.code < 300)
		return {custom_msg: "no error"};
	else if(err.code == 400)
		return {custom_msg: "bad request"};
	else if(err.code == 401)
		return {custom_msg: "unauthorized (check if you have a valid API key set in the environment variable)"};
	else if(err.code == 413)
		return {custom_msg: "payload too large"};
	else if(err.code == 429) {
		// The error was caused due to too many requests at the same time
		// So resend the email after 1 minute
		setTimeout(sendObj => {
			send(sendObj);
		}, 60000)
		return null;
	}
	else if(err.code == 500)
		return {custom_msg: "SendGrid Server Unavailable: An error occurred on a SendGrid server"};
	else if(err.code == 503)
		return {custom_msg: "The SendGrid v3 Web API is not available"}
	else if(err.code >= 500 && err.code < 600)
		return {custom_msg: "sendgrid server error"};
	else 
		return {custom_msg: "unknown error", err};
}

async function send(toSend) {
	/* For each recipient, call sgMail.send() function separately so that errors and success can be handled separaely
		for each recipient */
	toSend.to.forEach( async (recipient, index) => {
		const sendObj = {
			to: recipient,
			from: toSend.from,
			subject: toSend.subject,
			text: toSend.text,
		}

		sgMail.send(sendObj).then(async result => {
			db.handleEmailSent(toSend.emailSetID, recipient).catch(err => console.log(err));	
		}).catch(async err => {
			const error = handleErrors(err, sendObj);
			if(error)
				db.handleEmailError(toSend.emailSetID, recipient, error.custom_msg, error.err).catch(err => console.log(err));	
		})
	})
}

module.exports = {send};