const mongoose = require('mongoose');
const db = require("../models");

exports.createProduct = async function(req,res,next){
	try {
		// create Product with supplied data
		let product = await db.Product.create({
			name: req.body.name,
			photos: req.body.photos,
			description: req.body.description,
			price: req.body.price,
			type: req.body.type,
			stock: req.body.stock
		});

		foundProduct = await db.Product.findById(product._id);

		// Reply with new product
		return res.status(200).json(foundProduct);
	// Catch errors
	} catch(err) {
		return next(err);
	}
};

exports.getAllProducts = async function(req,res,next){
	try {
		let products = await db.Product.find().populate("type");
		return res.status(200).json(products);
	} catch(err) {
		return next(err);
	}
};

exports.getProduct = async function(req,res,next){
	try {
		let product = await db.Product.findById(req.params.product_id).populate("type");
		return res.status(200).json(product);
	} catch (err) {
		// If supplied id isn't a valid mongoose id
		if (!mongoose.isValidObjectId(req.params.product_id)) {
			// Return 404
			return res.status(404).json({error: {message: "Must be a valid product ID"}});
		}
		return next(err);
	}
};

exports.getFeaturedProducts = async function(req,res,next){
	try {
		// Get category products
		let products = await db.Product.find({type: req.params.type_id}).populate("type");
		// Filter by featured
		let featured = products.filter(p => p.featured === true);
		// Fill array with required number of products to make 2
		featured.push(...products.slice((-2 + featured.length)));
		// Return array of featured products with 200 OK status
		return res.status(200).json(featured);
	} catch(err){
		return next(err)
	};
};

// =========================If remove prehook?=========================
// 
// exports.deleteProduct = async function(req,res,next){
// 	try {
// 		// Find product to delete
// 		let foundProduct = await db.Product.find(req.params.product_id);
// 		// Remove product
// 		// |- not findByIdAndRemove as won't trigger pre-hook
// 		await foundProduct.remove();
// 		// Return removed product
// 		return res.status(200).json(foundProduct);
// 	} catch(err) {
// 		return next(err);
// 	}
// };
