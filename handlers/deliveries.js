const db = require("../models");

exports.createDelivery = async function (req, res, next) {
	try {
		// create Delivery option with supplied data
		let delivery = await db.Delivery.create({
			title: req.body.title,
			price: req.body.price,
			description: req.body.description,
			speed: req.body.speed,
		});

		let foundDelivery = await db.Delivery.findById(delivery._id);

		// Reply with new delivery option
		return res.status(200).json(foundDelivery);
		// Catch errors
	} catch (err) {
		return next(err);
	}
};

exports.getDeliveries = async function (req, res, next) {
	try {
		let deliveries = await db.Delivery.find()
			// Sort by price descending
			.sort({ price: -1 });
		return res.status(200).json(deliveries);
	} catch (err) {
		return next(err);
	}
};
