require('dotenv').config();
const jwt = require("jsonwebtoken");

exports.loginRequired = function(req,res,next){
	try {
		// Get token from header by splitting string (try/catch incase no header)
		const token = req.headers.authorization.split(" ")[1];
		// Use jwt verification to check token
		jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
			// If sucessful..
			if(decoded){
				// on you go
				return next();
			// Otherwise return error
			} else {
				return next({
					// 401 = unauthorised
					status: 401,
					message: "Please log in first"
				});
			};
		});
	// Catch errors
	} catch(err) {
		return next({
			status: 401,
			message: "Please log in first"
		});
	};
};

exports.ensureCorrectUser = function(req,res,next){
	try {
		// Get token from header by splitting string (try/catch incase no header)
		const token = req.headers.authorization.split(" ")[1];
		// Use jwt verification to check token
		jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
			// If sucessful AND id matches request id
			if(decoded && decoded.id === req.params.id){
				// On you go
				return next();
			} else {
				return next({
					status: 401,
					message: "Unauthorised"
				});
			};
		});
	} catch(err) {
		return next({
			status: 401,
			message: "Unauthorised"
		});
	};
};