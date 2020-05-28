const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true
	},
	speed: {
		type: Number,
		required: true
	}
});

const Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = Delivery;
