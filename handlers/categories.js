const db = require("../models");

exports.createCategory = async function (req, res, next) {
	try {
		// create Category with supplied data
		let category = await db.Category.create({
			title: req.body.title,
			type: req.body.type,
			color: req.body.color,
		});

		foundCategory = await db.Category.findById(category._id);

		// Reply with new category
		return res.status(200).json(foundCategory);
		// Catch errors
	} catch (err) {
		return next(err);
	}
};

exports.getAllCategories = async function (req, res, next) {
	try {
		let categories = await db.Category.find().sort({ _id: 1 });
		return res.status(200).json(categories);
	} catch (err) {
		return next(err);
	}
};

exports.getCategory = async function (req, res, next) {
	try {
		let category = await db.Category.find(req.params.type);
		return res.status(200).json(category);
	} catch (err) {
		return next(err);
	}
};

exports.getCategoryProducts = async function (req, res, next) {
	try {
		let cat = await db.Category.find({ type: req.params.type });
		let products = await db.Product.find({ type: cat[0]._id }).populate("type");
		if (products.length === 0) {
			return res.status(404).json(`Category '${req.params.type}' not found`);
		} else {
			return res.status(200).json(products);
		}
	} catch (err) {
		return next(err);
	}
};

exports.getNav = async function (req, res, next) {
	try {
		const cats = await db.Category.find().sort({ _id: 1 });
		const prodProms = cats.map(async (c) => {
			let p = await db.Product.find({ type: c._id }).populate("type");
			// Filter by featured
			let featured = p.filter((p) => p.featured === true);
			// Fill array with required number of products to make 2
			featured.push(...p.slice(-2 + featured.length));
			// Return array of featured products with 200 OK status
			return featured;
		});
		Promise.all(prodProms).then((data) => {
			res.status(200).json([cats, data]);
		});
	} catch (error) {
		return next(error);
	}
};
