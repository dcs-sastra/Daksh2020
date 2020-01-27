const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { errors } = require('celebrate');
const app = express();
const verifyToken = require('./middlewares/verifyToken')
const adminAccess = require('./middlewares/adminAccess')
const path = require('path')
/**
 * Route Modules
*/

const Auth = require('./routes/auth/Auth')
const Events = require('./routes/Events/Events')
const Admin = require('./routes/Admin/Admin')
const Mailer = require('./routes/mailer/Mailer')
const Hackathon = require('./routes/hackathon/Document') //for hackatothon form
/**
 * Connect to DB!
*/

const connectDb = () => {
	mongoose.connect(process.env.mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
		console.log("Connected to MongoDB!", err)
	})
}

/* hackathon db connection */
// mongoose.connect(process.env.mongo_uri_hackathon,{ useNewUrlParser: true,useCreateIndex : true,useUnifiedTopology: true });
// const connection = mongoose.connection;
// connection.once('open',()=>{
//     console.log('mongoose db for hackathon established successfully')
// })
app.use(express.static(path.join(__dirname, 'fe/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errors());

const { PORT } = process.env;
global.appRoot = __dirname;


// app.get('/', (req, res) => {
// 	res.json({ message: "This is Daksh 2020 Backend Api" });
// });

app.use('/auth', Auth)
app.use('/hackathon', [verifyToken], Hackathon)
app.use('/events', Events)
app.use('/admin', [verifyToken, adminAccess], Admin)
app.use('/mailer', Mailer)

if (process.env.NODE_ENV === 'production') {
	app.get('*', (req, res) => { res.sendFile(path.join(__dirname = 'fe/build/index.html')); })
}

app.listen(PORT, () => {
	connectDb();
	mongoose.set('useNewUrlParser', true);
	mongoose.set('useFindAndModify', false);
	mongoose.set('useCreateIndex', true);
	mongoose.set('useUnifiedTopology', true);
	console.log(`Server listening at port ${PORT}`);
});
