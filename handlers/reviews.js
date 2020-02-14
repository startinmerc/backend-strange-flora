const db = require("../models");

exports.createReview = async function(req,res,next){
	try {
		// create Review with supplied data
		let review = await db.Review.create({
			title: req.body.title,
			score: req.body.score,
			content: req.body.content,
			user: req.params.id
		});
		// Find author by id
		let foundUser = await db.User.findById(req.params.id);
		// Add review to author's reviews array
		foundUser.reviews.push(review.id);
		// Wait for db to save
		await foundUser.save();
		// Add username to review response to save re-looking up
		let foundReview = await db.Review.findById(review._id).populate("user", {
			username: true
		});
		// Reply with new review
		return res.status(200).json(foundReview);
	// Catch errors
	} catch(err) {
		return next(err);
	}
};

exports.getReview = async function(req,res,next){
	try {

	} catch(err) {
		return next(err);
	}
};

exports.deleteReview = async function(req,res,next){
	try {

	} catch(err) {
		return next(err);
	}
};
