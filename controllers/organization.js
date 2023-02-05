const Organization = require('../schemas/organization');

const getAllOrganizations = async (req, res) => {
	try {
		const people = await Organization.find();
		res.status(200).json(people);
	} catch (error) {
		res.status(500).json({ message: 'Database error!' });
		console.log('ERROR ACCURED: ', error);
	}
};

const createOrganization = async (req, res) => {
	console.log('request object', req.body);
	try {
		const people = await Organization.create(req.body);
		res.status(200).json({ message: 'organization registered successfully!' });
	} catch (error) {
		res.status(500).json({ message: 'Database error!' });
		console.log('ERROR ACCURED: ', error);
	}
};

const getOrganization = async (req, res) => {
	try {
		const person = await Organization.findById(req.params.id);
		res.status(200).json(person);
	} catch (error) {
		res.status(500).json({ message: 'Database error!' });
		console.log('ERROR ACCURED: ', error);
	}
};

const updateOrganization = async (req, res) => {
	try {
		const person = await Organization.updateOne(
			{ _id: req.params.id },
			{ ...req.body }
		);
		res.status(200).json(person);
	} catch (error) {
		res.status(500).json({ message: 'Database error!' });
		console.log('ERROR ACCURED: ', error);
	}
};

const deleteOrganization = async (req, res) => {
	try {
		const person = await Organization.deleteOne({ _id: req.params.id });
		res.status(200).json(person);
	} catch (error) {
		res.status(500).json({ message: 'Database error!' });
		console.log('ERROR ACCURED: ', error);
	}
};

module.exports = {
	getAllOrganizations,
	getOrganization,
	updateOrganization,
	deleteOrganization,
	createOrganization,
};
