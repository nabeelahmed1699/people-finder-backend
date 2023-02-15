const mongoose = require('mongoose');

const Organization = new mongoose.Schema({
	name: { type: String, immutable: true },
	branchName: { type: String, immutable: true },
	branchCode: { type: String, immutable: true },
	BIO: String,
	branchaddress: {
		city: String,
		country: String,
		street: String,
	},
	email: String,
	phoneNo: String,
	photo: String,
	coverImage: String,
	createdAt: { type: Date, immutable: true, default: () => Date.now() },
	updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model('Organization', Organization);
