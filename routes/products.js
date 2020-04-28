const express = require("express");
const router = express.Router({mergeParams: true});

const { createProduct, getProduct, getAllProducts, getFeaturedProducts } = require("../handlers/products");

router.route("/all").get(getAllProducts);
router.route("/").post(createProduct);
router.route("/featured/:category").get(getFeaturedProducts);
router.route("/:product_id").get(getProduct);

module.exports = router;
