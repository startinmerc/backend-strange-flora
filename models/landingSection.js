const mongoose = require("mongoose");

const landingSectionSchema = new mongoose.Schema({
	dark: {
		type: Boolean,
		required: true,
		default: false
	},
	header: {
		type: String,
		required: true
	},
	copy: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	links: {
		type: Array,
		required: true
	},
	type: {
		type: String,
		required: true
	}
});

const LandingSection = mongoose.model("LandingSection", landingSectionSchema);

module.exports = LandingSection;
