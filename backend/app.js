const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { errors } = require('celebrate');
const app = express();
const verifyToken = require('./middlewares/verifyToken')


/**
 * Route Modules
*/

const Auth = require('./routes/auth/Auth')
const Events = require('./routes/Events/Events')

/**
 * Connect to DB!
*/

const connectDb = () => {
	mongoose.connect(process.env.mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
		console.log("Connected to MongoDB!", err)
	})
}



const { PORT } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errors());

app.get('/', verifyToken, (req, res) => {
	res.json({ message: "This is Daksh 2020 Backend Api" });
});

app.use('/auth', Auth)
app.use('/events', Events)

app.listen(PORT, () => {
	connectDb();
	console.log(`Server listening at port ${PORT}`);
});
