const express = require('express')
const bodyParser = require('body-parser')
const app = express();



/**
 * Route Modules
*/

const Auth = require('./routes/auth/Auth')


const { PORT } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
	res.json({ message: "This is Daksh 2020 Backend Api" });
});

app.use('/auth', Auth)


app.listen(PORT, () => {
	console.log(`Server listening at port ${PORT}`);
});
