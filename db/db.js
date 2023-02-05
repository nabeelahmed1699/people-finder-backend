const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
let connectionURI = 'mongodb://127.0.0.1:27017/peopleFinder';
async function connectToDB(callback) {
	try {
		await mongoose.connect(connectionURI);
		callback();
	} catch (error) {
		callback(error);
	}
	// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = connectToDB;
