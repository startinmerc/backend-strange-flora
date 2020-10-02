const db = require("../models");

exports.createLandingSection = async function (req, res, next) {
	try {
		// create LandingSection with supplied data
		let landingSection = await db.LandingSection.create({
			title: req.body.title,
			landingSection: req.body.landingSection,
			color: req.body.color,
		});

		foundLandingSection = await db.LandingSection.findById(landingSection._id);

		// Reply with new landingSection
		return res.status(200).json(foundLandingSection);
		// Catch errors
	} catch (err) {
		return next(err);
	}
};

exports.getAllLandingSections = async function (req, res, next) {
	try {
		let landingSections = await db.LandingSection.find();
		return res.status(200).json(landingSections);
	} catch (err) {
		return next(err);
	}
};

exports.deleteLandingSection = async function (req, res, next) {
	try {
		// Find review to delete
		let foundLandingSection = await db.LandingSection.findByIdAndRemove(
			req.params.section_id
		);
		// Return removed review
		return res.status(200).json(foundLandingSection);
	} catch (err) {
		return next(err);
	}
};
