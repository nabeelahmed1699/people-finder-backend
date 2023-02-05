const mongoose = require('mongoose');

const Organization = new mongoose.Schema({
	name: String,
  branchName: String,
  branchCode:String,
	branchaddress: {
		city: String,
		state: String,
		street: String,
	},
	createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model('Organization', Organization);
