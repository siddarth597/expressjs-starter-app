const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { authorize } = require("../middlewares/authorize.middleware");

// this route is accessible by anyone who has either user or admin role
router.route("/").get([authorize()], userController.getAllUsers);

// below routes do not require both authenticatino & authorization and are whitelisted in middlewares/auth.middleware.js file
router.route("/register").post(userController.register);
router.route("/login").post(userController.login);

// this route is accessible only by admins
router
  .route("/:id")
  .delete([authorize((authorizeAdminOnly = true))], userController.deleteUser);

module.exports = router;
