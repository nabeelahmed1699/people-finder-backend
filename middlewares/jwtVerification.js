const jwt = require('jsonwebtoken')

const verifyJWTToken = async (req, res, next) => {
	const token = req.headers['x-auth-token'];
	if (!token)
		return res
			.status(401)
			.json({ message: 'Access denied!, No token provided.' });

	try {
		const decoded = jwt.verify(token, process.env.JWTSECRETKEY);
		console.log('decoded', decoded);
		req.user = decoded;
		next();
	} catch (ex) {
		res.status(400).json({ message: 'Invalid token.' });
		console.log(ex)
	}
};

module.exports = verifyJWTToken;
