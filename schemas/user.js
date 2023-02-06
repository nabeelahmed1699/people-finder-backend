const mongoose = require('mongoose');

const User = new mongoose.Schema({
	name: { type: String, immutable: true, trim: true },
	email: String,
	DOB: { type: Date, immutable: true },
	gender: String,
	role: String,
	password: { type: String, minlength: 5, maxlength: 40 },
	profilePic: String,
	createdAt: { type: Date, immutable: true, default: () => Date.now() },
	updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model('User', User);
