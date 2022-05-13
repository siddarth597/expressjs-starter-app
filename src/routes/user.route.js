const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

// Create routes for user here

router.route("/register").post(UserController.createUser);

module.exports = router;
