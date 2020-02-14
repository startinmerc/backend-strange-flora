const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	section: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		required: true
	}
});

const Category = mongoose.Model("Category", categorySchema);

module.exports = Category;
