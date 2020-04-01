const express = require("express");
const router = express.Router({mergeParams: true});

const { createCategory, getCategory, getAllCategories, getCategoryProducts } = require("../handlers/categories");

router.route("/all").get(getAllCategories);
router.route("/").post(createCategory);
router.route("/:category").get(getCategory);
router.route("/:category/products").get(getCategoryProducts);
// router.route("/:review_id").delete(deleteCategory);

module.exports = router;
