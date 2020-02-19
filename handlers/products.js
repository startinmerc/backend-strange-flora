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
		let products = await db.Product.find();
		return res.status(200).json(products);
	} catch(err) {
		return next(err);
	}
};

exports.getProduct = async function(req,res,next){
	try {
		let product = await db.Product.find(req.params.product_id);
		return res.status(200).json(product);
	} catch(err) {
		return next(err);
	}
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