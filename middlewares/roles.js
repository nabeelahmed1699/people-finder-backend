const _ = require('lodash');

const { base_url } = require('../configs/configs');
const roles = {
	admin: 'ADMIN',
	user: 'USER',
};

const routes = [
	{
		url: `${base_url}/organization`,
		[roles.admin]: true,
		[roles.user]: true,
		method: 'GET',
		params: false,
	},
	{
		url: `${base_url}/organization`,
		[roles.admin]: true,
		[roles.user]: false,
		method: 'POST',
		params: false,
	},
	{
		url: `${base_url}/organization`,
		[roles.admin]: true,
		[roles.user]: false,
		method: 'DELETE',
		params: false,
	},
];

// // organization
// const getAllOrganizations = {
// 	url: `${base_url}/organization`,
// 	adminAccess: true,
// 	userAccess: true,
// };

// const createOrganization = {
// 	url: `${base_url}/organization`,
// 	adminAccess: true,
// 	userAccess: false,
// };

// const deleteOrganization = {
// 	url: `${base_url}/organization`,
// 	adminAccess: true,
// 	userAccess: false,
// };

// const getSingleOrganization = {
// 	url: `${base_url}/organization`,
// 	adminAccess: true,
// 	userAccess: true,
// };

// const updateOrganization = {
// 	url: `${base_url}/organization`,
// 	adminAccess: true,
// 	userAccess: true,
// };

// // founded people
// const getAllFoundedPeople = {
// 	url: `${base_url}/organization`,
// 	adminAccess: true,
// 	userAccess: true,
// };

// const getSinglePerson = {
// 	url: `${base_url}/organization`,
// 	adminAccess: true,
// 	userAccess: true,
// };

// const updatePerson = {
// 	url: `${base_url}/organization`,
// 	adminAccess: true,
// 	userAccess: false,
// };
// const deletePerson = {
// 	url: `${base_url}/organization`,
// 	adminAccess: true,
// 	userAccess: false,
// };

// // auth
// // const login = 'login';

// // user
// // const registerUser = {
// // 	url: `${base_url}/organization`,
// // 	adminAccess: true,
// // 	userAccess: true,
// // }

// // const deleteUser = {
// // 	url: `${base_url}/organization`,
// // 	adminAccess: true,
// // 	userAccess: true,
// // }

// // const updateUser = {
// // 	url: `${base_url}/organization`,
// // 	adminAccess: true,
// // 	userAccess: true,
// // }

// // const getUser = {
// // 	url: `${base_url}/organization`,
// // 	adminAccess: true,
// // 	userAccess: true,
// // }

// const adminRoutes = {
// 	// organizations
// 	getAllOrganizations,
// 	createOrganization,
// 	deleteOrganization,
// 	getSingleOrganization,
// 	updateOrganization,

// 	// founded people
// 	getAllFoundedPeople,
// 	getSinglePerson,
// 	updatePerson,
// 	deletePerson,

// 	// user
// 	// deleteUser,
// 	// updateUser,
// 	// getUser,
// };

// const userRoutes = {
// 	// organizations
// 	getAllOrganizations,
// 	getSingleOrganization,

// 	// founded people
// 	getAllFoundedPeople,

// 	// user
// 	// deleteUser,
// 	// updateUser,
// };

const roleVerification = (req, res, next) => {
	console.log(req.user);
	obj_to_locate = {
		url: req.url,
		method: req.method,
		params: req.params.id ? true : false,
	};
	const result = _.find(routes, obj_to_locate);
	console.log('result', result);

	if (result[req.user.role]) {
		next();
		return;
	}
	res.status(401).json({message:"Access denied!"})
	next();
};

module.exports = roleVerification;
