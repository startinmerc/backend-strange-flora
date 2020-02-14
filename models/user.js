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

userSchema.pre("save", async function(){
	try {
		if(!this.isModified("password")){
			return next();
		} else {
			let hashedPassword = await bcrypt.hash(this.password, 10);
			this.password = hashedPassword;
			return next();
		}
	} catch(err) {
		return next(err);
	}
});

userSchema.method.comparePassword = async function(candidatePassword, next){
	try {
		let isMatch = await bcrypt.compare(candidatePassword, this.password);
		return isMatch;
	} catch(err) {
		return next(err);
	}
};

const User = mongoose.Model("User", userSchema);

module.exports = User;
