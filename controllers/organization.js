const _ = require('lodash');
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
	let organization = await Organization.findOne({
		$or: [
			{ email: req.body.email },
			{ name: req.body.name },
			{ branchCode: req.body.branchCode },
			{ branchName: req.body.branchName },
		],
	});
	if (organization)
		return res.status(400).json({ message: 'Organization already exist!' });
	try {
		const people = await Organization.create(
			_.pick(req.body, [
				'name',
				'email',
				'branchName',
				'branchCode',
				'phoneNo',
				'branchaddress',
			])
		);
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
	const person = await Organization.findByIdAndUpdate(
		req.params.id,
		{ ...req.body },
		{ new: true }
	);
	if (!person)
		return res.status(400).json({ message: `Organization does'nt exist` });
	
	return res.status(200).json(person);
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
