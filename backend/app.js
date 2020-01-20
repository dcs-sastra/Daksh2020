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
const Mailer = require('./routes/mailer/Mailer')
const Document = require('./routes/hackathon/Document') //for hackatothon form
/**
 * Connect to DB!
*/

const connectDb = () => {
	mongoose.connect(process.env.mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
		console.log("Connected to MongoDB!", err)
	})
}

/* hackathon db connection */
mongoose.connect(process.env.mongo_uri_hackathon,{ useNewUrlParser: true,useCreateIndex : true,useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('mongoose db for hackathon established successfully')
})



const { PORT } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errors());

app.get('/', verifyToken, (req, res) => {
	res.json({ message: "This is Daksh 2020 Backend Api" });
});

app.use('/auth', Auth)
app.use('/events', Events)
app.use('/mailer', Mailer)
app.use('/document',Document)

app.listen(PORT, () => {
	connectDb();
	mongoose.set('useNewUrlParser', true);
	mongoose.set('useFindAndModify', false);
	mongoose.set('useCreateIndex', true);
	mongoose.set('useUnifiedTopology', true);
	console.log(`Server listening at port ${PORT}`);
});
