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



const roleVerification = (req, res, next) => {
	obj_to_locate = {
		url: req.url,
		method: req.method,
		params: req.params.id ? true : false,
	};
	const result = _.find(routes, obj_to_locate);
console.log("result[req.user.role]=>",result)
	if (result[req.user.role]) {
		next();
		return;
	}

	return res.status(401).json({ message: 'Access denied!' });
};

module.exports = roleVerification;
