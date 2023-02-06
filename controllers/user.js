const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken')
const User = require('../schemas/user');

const registerUser = async (req, res) => {
	let user = await User.findOne({
		$or: [{ email: req.body.email }, { name: req.body.name }],
	});
	if (user) return res.status(400).json({ message: 'User already exist!' });
	try {
		user = new User(
			_.pick(req.body, [
				'name',
				'email',
				'DOB',
				'gender',
				'role',
				'password',
				'profilePic',
			])
		);
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);
		await user.save();

		const token = jwt.sign(
			{ _id: user._id },
			process.env.jwtPrivateKey('jwtPrivateKey')
		);

		res.header('x-auth-token',token).status(200).json(_.pick(req.body, [
      'name',
      'email',
      'DOB',
      'gender',
      'role',
      'profilePic',
    ]));
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong!' });
		console.log('ERROR ACCURED: ', error);
	}
};

const updateUser = async (req, res) => {
	const person = await User.findByIdAndUpdate(
		req.params.id,
		{ ...req.body },
		{ new: true }
	);
	if (!person)
		return res.status(400).json({ message: `Organization does'nt exist` });

	return res.status(200).json(person);
};

const deleteUser = async (req, res) => {
	try {
		const person = await User.deleteOne({ _id: req.params.id });
		res.status(200).json(person);
	} catch (error) {
		res.status(500).json({ message: 'Database error!' });
		console.log('ERROR ACCURED: ', error);
	}
};

module.exports = {
	registerUser,
	updateUser,
	deleteUser,
};
