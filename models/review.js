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

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
