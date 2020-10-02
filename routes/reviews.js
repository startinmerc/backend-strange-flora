const express = require("express");
const router = express.Router({ mergeParams: true });

const {
	createReview,
	getReview,
	deleteReview,
} = require("../handlers/reviews");

router.route("/").post(createReview);

router.route("/:review_id").get(getReview);
router.route("/:review_id").delete(deleteReview);

module.exports = router;
