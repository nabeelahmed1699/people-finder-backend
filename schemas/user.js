const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = new mongoose.Schema({
	name: { type: String, immutable: true, trim: true },
	email: String,
	DOB: { type: Date, immutable: true },
	gender: String,
	role: String,
	password: { type: String, minlength: 5, maxlength: 255 },
	profilePic: String,
	createdAt: { type: Date, immutable: true, default: () => Date.now() },
	updatedAt: { type: Date, default: () => Date.now() },
});
User.methods.generateAuthToken = function () {
	const token = jwt.sign(
		{ _id: this._id, role: this.role },
		process.env.JWTSECRETKEY
	);
	return token;
};
module.exports = mongoose.model('User', User);
