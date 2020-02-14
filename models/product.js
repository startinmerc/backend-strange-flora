const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	photos: {
		type: Array,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	reviews: {
		type: Array,
		required: false
	},
	price: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	stock: {
		type: Number,
		required: true
	}
});

const Product = mongoose.Model("Product", productSchema);

module.exports = Product;
