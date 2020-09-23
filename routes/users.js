const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  getAllUsers,
  getUser,
  editUser,
  deleteUser
} = require("../handlers/users");

router.route("/")
  .get(getAllUsers);

router.route("/:user_id")
  .get(getUser)
  .put(editUser)
  .delete(deleteUser);

module.exports = router;
