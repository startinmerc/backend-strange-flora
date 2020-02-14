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

// Before User is saved
userSchema.pre("save", async function(next){
	try {
		// If password hasn't changed
		if(!this.isModified("password")){
			// Skip
			return next();
		// Otherwise
		} else {
			// Encrypt password using async brypt.hash, provide salt key of 10
			let hashedPassword = await bcrypt.hash(this.password, 10);
			// Replace plain with encrypted password
			this.password = hashedPassword;
			// Carry on
			return next();
		}
	// Catch & pass on errors
	} catch(err) {
		return next(err);
	}
});

// Add method to schema for password checking
userSchema.methods.comparePassword = async function(candidatePassword, next){
	try {
		// Compare submitted & stored passwords using async bcrypt.compare
		let isMatch = await bcrypt.compare(candidatePassword, this.password);
		// Return boolean
		return isMatch;
	// Catch & pass on errors
	} catch(err) {
		return next(err);
	}
};

const User = mongoose.model("User", userSchema);

module.exports = User;
