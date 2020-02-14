const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	score: {
		type: Number,
		required: true,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Author"
	},
	content: {
		type: String,
		required: true,
	}
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
