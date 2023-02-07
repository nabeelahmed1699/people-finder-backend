const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = require('../schemas/user');


const registerUser = async (req, res) => {
	let user = await User.findOne({ email: req.body.email });
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

		const token = user.generateAuthToken();

		res
			.header('x-auth-token', token)
			.status(200)
			.json(
				_.pick(user, [
					'_id',
					'name',
					'email',
					'DOB',
					'gender',
					'role',
					'profilePic',
				])
			);
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong!' });
		console.log('ERROR ACCURED: ', error);
	}
};

const updateUser = async (req, res) => {
	console.log({ ...req.body });
	const person = await User.findByIdAndUpdate(
		req.params.id,
		{ ...req.body }
		// { new: true }
	);
	if (!person) return res.status(400).json({ message: `User does'nt exist!` });
	return res
		.status(200)
		.json(
			_.pick(person, ['name', 'email', 'DOB', 'gender', 'role', 'profilePic'])
		);
};

const deleteUser = async (req, res) => {
	try {
		const person = await User.deleteOne({ _id: req.params.id });
		res.status(200).json({ message: 'User deleted successfully!' });
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong!' });
		console.log('ERROR ACCURED: ', error);
	}
};

module.exports = {
	registerUser,
	updateUser,
	deleteUser,
};
