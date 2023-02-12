const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const User = require('../schemas/user');

const login = async (req, res) => {
	let user = await User.findOne({ email: req.body.email });
	if (!user)
		return res.status(400).json({ message: 'Invalid email or password!' });

	const isValid = bcrypt.compare(req.body.password, user.password);
	if (!isValid)
		return res.status(400).json({ message: 'Invalid email or password!' });


	const token = user.generateAuthToken();

const person = _.pick(user, [
	'_id',
	'name',
	'email',
	'DOB',
	'gender',
	'role',
	'profilePic',
])
person['x-auth-token'] = token
	res
	.status(200)
	.json(
		person
	);
};

module.exports = {login};
