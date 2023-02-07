require('dotenv').config();
const express = require('express');
const app = express();
const foundedPerson = require('./routes/foundPerson');
const organization = require('./routes/organization');
const user = require('./routes/user');
const auth = require('./routes/auth');
const connectToDB = require('./db/db');
const verifyJWTToken = require('./middlewares/jwtVerification');
const roleVerification = require('./middlewares/roles');


const port = process.env.PORT || 5000;

// middleware
app.use(express.json());

connectToDB((error) => {
	if (!error) {
		app.listen(port, () => console.log(`listening on port ${port}...`));
		return;
	}
	console.log(error);
});

app.use('/api/v1/auth', auth);
app.use('/api/v1/user', user);

// JWT VERIFICATIONS
app.use(verifyJWTToken);
app.use(roleVerification);

// routes
app.use('/api/v1/foundedPerson', foundedPerson);
app.use('/api/v1/organization', organization);
