const FoundedPerson = require('../schemas/foundPerson');

const getAllPersons = async (req, res) => {
	try {
		const people = await FoundedPerson.find();
		res.status(200).json(people);
	} catch (error) {
		res.status(500).json({ message: 'Database error!' });
		console.log('ERROR ACCURED: ', error);
	}
};

const createPerson = async (req, res) => {
	console.log('request object', req.body);
	try {
		const people = await FoundedPerson.create(req.body);
		res.status(200).json({ message: 'person created successfully!' });
	} catch (error) {
		res.status(500).json({ message: 'Database error!' });
		console.log('ERROR ACCURED: ', error);
	}
};

const getPerson = async (req, res) => {
	try {
		const person = await FoundedPerson.findById(req.params.id);
		res.status(200).json(person);
	} catch (error) {
		res.status(500).json({ message: 'Database error!' });
		console.log('ERROR ACCURED: ', error);
	}
};

const updatePerson = async (req, res) => {
	try {
		const person = await FoundedPerson.updateOne(
			{ _id: req.params.id },
			{ ...req.body }
		);
		res.status(200).json(person);
	} catch (error) {
		res.status(500).json({ message: 'Database error!' });
		console.log('ERROR ACCURED: ', error);
	}
};

const deletePerson = async (req, res) => {
	try {
		const person = await FoundedPerson.deleteOne({ _id: req.params.id });
		res.status(200).json(person);
	} catch (error) {
		res.status(500).json({ message: 'Database error!' });
		console.log('ERROR ACCURED: ', error);
	}
};

module.exports = {
	getAllPersons,
	createPerson,
	getPerson,
	updatePerson,
	deletePerson,
};
