const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	},
});

const User = mongoose.Model("User", userSchema);

module.exports = User;
