const mongoose = require("mongoose");
const User = require("./user");

const reviewSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	score: {
		type: Number,
		required: true,
		min: 1,
		max: 5
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Product"
	},
	content: {
		type: String,
		required: true
	}
}, {
		timestamps: true
});

// Remove review from user's reviews schema
reviewSchema.pre("remove", async function(next){
	try {
		// find user by Id
		let user = await User.findById(this.user);
		// remove review from user's reviews array
		user.reviews.remove(this.id);
		// wait for db to save
		await user.save();

		let product = await Product.findById(this.product);
		product.reviews.remove(this.id);
		await product.save();

		// on you go
		return next();
	// Or catch error
	} catch(err) {
		return next(err);
	};
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
