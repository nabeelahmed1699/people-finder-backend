const MissingPerson = require('../schemas/missingPeople');
const FoundPerson = require('../schemas/foundPerson');

const getAllPersons = async (req, res) => {
	try {
		const people = await MissingPerson.find({recovered:true}).populate("posterInfo",'name');
		const found = await FoundPerson.find({recovered:true}).populate("organizationInfo",'name');
		const peopleData = people.map((dat)=>{
			const obj = {
				...dat,
				organizationInfo:dat.posterInfo
			}
			delete obj.posterInfo
			return obj
		})
		res.status(200).json({status:200,people:[...found,...peopleData]});
	} catch (error) {
		res.status(500).json({ message: 'Database error!' });
		console.log('ERROR ACCURED: ', error);
	}
};

module.exports = {
	getAllPersons,
};
