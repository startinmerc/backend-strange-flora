const mongoose = require("mongoose");
const User = require("./user");

const reviewSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	score: {
		type: Number,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	content: {
		type: String,
		required: true,
	}
});

// Remove review from user's reviews schema
reviewSchema.pre("remove", async function(next){
	try {
		// find user by Id
		let user = await User.findById(this.userId);
		// remove review from user's reviews array
		user.reviews.remove(this.id);
		// wait for db to save
		await user.save();
		// on you go
		return next();
	// Or catch error
	} catch(err) {
		return next(err);
	};
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
