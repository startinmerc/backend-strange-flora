const express = require("express");
const router = express.Router({mergeParams: true});
const db = require("../models");

const { createProduct, getProduct } = require("../handlers/products");

router.route("/all").get(async function(req,res,next){
	try {
		let products = await db.Products.find()
		return res.status(200).json(products);
	} catch(err) {
		return next(err);
	}
});

router.route("/").post(createProduct);

router.route("/:product_id").get(getProduct);
// router.route("/:review_id").delete(deleteProduct);

module.exports = router;
