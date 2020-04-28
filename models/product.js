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
	},
	reviews: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Review"
	}],
	featured: {
		type: Boolean,
		default: false
	}
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
