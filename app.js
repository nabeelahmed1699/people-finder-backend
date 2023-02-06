
const express = require('express');
const app = express();
const foundedPerson = require('./routes/foundPerson');
const organization = require('./routes/organization');
const user = require("./routes/user")
const auth = require("./routes/auth")
const connectToDB = require('./db/db');

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

// routes
app.use('/api/v1/foundedPerson', foundedPerson);
app.use('/api/v1/organization', organization);
app.use('/api/v1/user', user);
app.use('/api/v1/auth', auth);
