const mongoose = require('mongoose');

const MissingPerson = new mongoose.Schema({
	name: String,
	fatherName: String,
	motherName: String,
	age: Number,
	photo: String,
	cellNo: String,
	city: String,
	state: String,
	street: String,
	country: String,
	mentalCondition: String,
	physicalCondition: String,
	dateMissing: Date,
	posterInfo: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
	description: String,
	createdAt: { type: Date, immutable: true, default: () => Date.now() },
	updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model('MissingPerson', MissingPerson);
