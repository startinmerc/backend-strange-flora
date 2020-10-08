const express = require("express");
const router = express.Router({ mergeParams: true });

const {
	createCategory,
	getCategory,
	getAllCategories,
	getCategoryProducts,
	getNav,
} = require("../handlers/categories");

router.route("/all").get(getAllCategories);
router.route("/").post(createCategory);
router.route("/popnav").get(getNav);
router.route("/:category").get(getCategory);
router.route("/:type/products").get(getCategoryProducts);
// router.route("/:review_id").delete(deleteCategory);

module.exports = router;
