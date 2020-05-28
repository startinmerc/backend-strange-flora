const express = require("express");
const router = express.Router({mergeParams: true});

const { createDelivery, getDeliveries } = require("../handlers/deliveries");

router.route("/").get(getDeliveries);
router.route("/").post(createDelivery);

module.exports = router;
