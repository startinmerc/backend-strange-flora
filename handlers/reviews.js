const db = require("../models");

exports.createReview = async function (req, res, next) {
	try {
		// create Review with supplied data
		let review = await db.Review.create({
			title: req.body.title,
			score: req.body.score,
			content: req.body.content,
			user: req.params.id,
			product: req.body.product,
		});

		// Find author by id
		let foundUser = await db.User.findById(req.params.id);
		// Add review to author's reviews array
		foundUser.reviews.push(review.id);
		// Wait for db to save
		await foundUser.save();

		// Find product by id
		let foundProduct = await db.Product.findById(req.body.product);
		// Add review to author's reviews array
		foundProduct.reviews.push(review.id);
		// Wait for db to save
		await foundProduct.save();

		// Add username + prod to review response to save re-looking up
		let foundReview = await db.Review.findById(review._id)
			.populate("user", { username: true })
			.populate("product", { name: true });

		// Reply with new review
		return res.status(200).json(foundReview);
		// Catch errors
	} catch (err) {
		return next(err);
	}
};

exports.getReview = async function (req, res, next) {
	try {
		let review = await db.Review.findById(req.params.review_id);
		return res.status(200).json(review);
	} catch (err) {
		return next(err);
	}
};

exports.deleteReview = async function (req, res, next) {
	try {
		// Find review to delete
		let foundReview = await db.Review.findById(req.params.review_id);
		// Remove review
		// |- not findByIdAndRemove as won't trigger pre-hook
		await foundReview.remove();
		// Return removed review
		return res.status(200).json(foundReview);
	} catch (err) {
		return next(err);
	}
};
