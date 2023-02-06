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
	const token = jwt.sign(
		{ _id: user._id },
		process.env.jwtPrivateKey('jwtPrivateKey')
	);
	res.send(token);
};

module.exports = {login};
