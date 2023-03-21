const MissingPerson = require('../schemas/missingPeople');

const getAllPersons = async (req, res) => {
	try {
		const people = await MissingPerson.find({recovered:false}).populate("posterInfo",'name');;
		res.status(200).json({status:200,people:people});
	} catch (error) {
		res.status(500).json({ message: 'Database error!' });
		console.log('ERROR ACCURED: ', error);
	}
};

const createPerson = async (req, res) => {
	try {
		const people = await MissingPerson.create(req.body);
		res
			.status(200)
			.json({
				status: 200,
				message: 'person created successfully!',
				_id: people._id,
			});
	} catch (error) {
		res.status(500).json({ message: 'Database error!' });
		console.log('ERROR ACCURED: ', error);
	}
};

const getPerson = async (req, res) => {
	try {
		const person = await MissingPerson.findById(req.params.id);
		res.status(200).json(person);
	} catch (error) {
		res.status(500).json({ message: 'Database error!' });
		console.log('ERROR ACCURED: ', error);
	}
};

const updatePerson = async (req, res) => {
	console.log({ _id: req.params.id });
	try {
		const person = await MissingPerson.findByIdAndUpdate(req.params.id ,
			{ ...req.body },
			{ new: true }
		);
		// console.log('after update',{ person });
		res
			.status(200)
			.json({
				status: 200,
				message: 'Post updated successfully!',
				_id: req.params.id,
			});
	} catch (error) {
		res.status(500).json({ message: 'Database error!' });
		console.log('ERROR ACCURED: ', error);
	}
};

const recoverPerson = async (req, res) => {
	// console.log({ _id: req.params.id });
	try {
		const person = await MissingPerson.findByIdAndUpdate(req.params.id ,
			{ recovered:true },
			{ new: true }
		);
		console.log('after update',{ person });
		res
			.status(200)
			.json({
				status: 200,
				message: 'Person recovered successfully!',
				_id: req.params.id,
			});
	} catch (error) {
		res.status(500).json({ message: 'Database error!' });
		console.log('ERROR ACCURED: ', error);
	}
};

const deletePerson = async (req, res) => {
	try {
		const person = await MissingPerson.deleteOne({ _id: req.params.id });
		res.status(200).json({satus:200,...person});
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
	recoverPerson
};
