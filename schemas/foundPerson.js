const mongoose = require('mongoose');

const FoundedPerson = new mongoose.Schema({
	name: String,
	fatherName: String,
	motherName: String,
	age: Number,
	photo: String,
	cellNo: String,
	address: {
		city: String,
		state: String,
		street: String,
		country:String
  },
  mentalCondition: String,
  physicalCondition: String,
  dateFound: Date,
  organizationInfo: {type:mongoose.SchemaTypes.ObjectId,ref:'Organization'},
	description: String,
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
  updatedAt: { type: Date, default: () => Date.now() },
});

// const organizationInfo = new mongoose.Schema({
// 	name: String,
//   branchName: String,
//   branchCode:String,
// 	branchaddress: {
// 		city: String,
// 		state: String,
// 		street: String,
// 	},
// });




module.exports = mongoose.model('FoundedPerson', FoundedPerson);
