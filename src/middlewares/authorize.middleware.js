const authorize = (authorizeAdminOnly = false) => {
  /**
   * This middleware helps in authorizing the users to the application.
   *
   * Set authorizeAdminOnly to true only if a API is restricted to admins only. else it will be available for both users and admins
   */
  return [
    // authorize based on user role
    (req, res, next) => {
      let isAuthorized = false;

      if (req?.user?.role) {
        if (authorizeAdminOnly && req.user.role.toLowerCase() == "admin") {
          isAuthorized = true;
        } else if (
          authorizeAdminOnly &&
          req.user.role.toLowerCase() != "admin"
        ) {
          isAuthorized = false;
        } else if (
          !authorizeAdminOnly &&
          (req.user.role.toLowerCase() == "admin" ||
            req.user.role.toLowerCase() == "user")
        ) {
          isAuthorized = true;
        }
      }

      if (isAuthorized) {
        console.log(`user authorised for -> ${req.user.role} role`);
      } else {
        // not authorized
        console.log(
          `role of the user -> ${req.user.role || "no role"} sending 403 status`
        );
        return res.status(403).json({
          success: false,
          error: "Forbidden",
          message: "Forbidden for the user",
        });
      }

      next();
    },
  ];
};

module.exports = authorize;
