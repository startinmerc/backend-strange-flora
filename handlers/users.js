const db = require("../models");

exports.getUser = async function (req, res, next) {
	try {
		let user = await db.User.findById(req.params.user_id);
		return res.status(200).json(user);
	} catch (err) {
		return next(err);
	}
};

exports.getAllUsers = async function (req, res, next) {
	try {
		let users = await db.User.find();
		return res.status(200).json(users);
	} catch (err) {
		return next(err);
	}
};

exports.editUser = async function (req, res, next) {
	try {
		let params = {};
		// Create copy of submitted data to avoid overwriting non-changed properties with null
		for (let prop in req.body) {
			if (req.body[prop]) {
				params[prop] = req.body[prop];
			}
		}

		let foundUser = await db.User.findByIdAndUpdate(
			req.params.user_id,
			params,
			function (err, updatedUser) {
				if (err) {
					return err;
				} else {
					return updatedUser;
				}
			}
		);
		return res.status(200).json(foundUser);
	} catch (err) {
		return next(err);
	}
};

exports.deleteUser = async function (req, res, next) {
	try {
		db.User.findByIdAndRemove(req.params.user_id, function (err, removedUser) {
			if (err) {
				return next(err);
			} else {
				return res.status(200).json(removedUser);
			}
		});
	} catch (err) {
		return next(err);
	}
};
