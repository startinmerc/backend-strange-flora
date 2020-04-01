const express = require("express");
const router = express.Router({mergeParams: true});

const { createLandingSection, getAllLandingSections, deleteLandingSection } = require("../handlers/landingSections");

router.route("/").post(createLandingSection);
router.route("/").get(getAllLandingSections);
router.route("/:landingSection_id").delete(deleteLandingSection);

module.exports = router;
