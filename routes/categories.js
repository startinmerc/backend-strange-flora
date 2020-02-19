const express = require("express");
const router = express.Router({mergeParams: true});

const { createCategory, getCategory, getAllCategories } = require("../handlers/categories");

router.route("/all").get(getAllCategories);
router.route("/").post(createCategory);
router.route("/:category_id").get(getCategory);
// router.route("/:review_id").delete(deleteCategory);

module.exports = router;
