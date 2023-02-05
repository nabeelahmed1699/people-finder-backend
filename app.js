const express = require('express');
const app = express();
const foundedPerson = require('./routes/foundPerson');
const organization = require('./routes/organization');
const connectToDB = require('./db/db');

const port = 5000;

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
