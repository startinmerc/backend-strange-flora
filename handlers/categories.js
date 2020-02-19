const db = require("../models");

exports.createCategory = async function(req,res,next){
	try {
		// create Category with supplied data
		let category = await db.Category.create({
			title: req.body.title,
			section: req.body.section,
			color: req.body.color
		});

		foundCategory = await db.Category.findById(category._id);

		// Reply with new category
		return res.status(200).json(foundCategory);
	// Catch errors
	} catch(err) {
		return next(err);
	}
};

exports.getAllCategories = async function(req,res,next){
	try {
		let categories = await db.Category.find();
		return res.status(200).json(categories);
	} catch(err) {
		return next(err);
	}
};

exports.getCategory = async function(req,res,next){
	try {
		let category = await db.Category.find(req.params.category_id);
		return res.status(200).json(category);
	} catch(err) {
		return next(err);
	}
};