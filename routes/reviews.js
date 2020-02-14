const express = require("express");
const router = express.Router({mergeParams: true});

const { createReview } = require("../handlers/reviews");

router.route("/").post(createReview);

module.exports = router;
