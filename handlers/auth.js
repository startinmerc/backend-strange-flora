const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req,res,next){
	try {
		// Find user in DB
		let user = await db.User.findOne({
				email: req.body.email
			});
		// Assign id & username
		let { id, username } = user;
		// Check password is correct
		let isMatch = await user.comparePassword(req.body.password);
		// If so
		if(isMatch) {
			// Set JSON web token with id & username
			let token = jwt.sign({
					id,
					username
				}, process.env.SECRET_KEY
			);
			// Return OK status with JWT
			return res.status(200).json({
				id,
				username,
				token
			});
		// Otherwise return invalid email/password
		} else {
			return next({
				status: 400,
				message: "Invalid Email/Password"
			});
		};
	// Catch non-existing user
	} catch(err) {
			return next({
				status: 400,
				message: "Invalid Email/Password"
			});
	};
};

exports.signup = async function(req,res,next){
	try {
		// Create User from schema
		let user = await db.User.create(req.body);
		// Destructure id + username
		let { id, username } = user;
		// Create JSON web token w/ these + secret key encryption
		let token = jwt.sign({
			id,
			username
		}, process.env.SECRET_KEY
		);
		// Return next w/ JSON of user data + token
		return res.status(200).json({
			id,
			username,
			token
		});
	} catch(err) {
		// If validation fails (non-unique)
		if(err.code === 11000){
			// Reformat error message
			err.message = "Sorry, that username and/or email is taken";
		}
		// Return next with error
		return next({
			status: 400,
			message: err.message
		});
	};
};