let jwt = require("jsonwebtoken");
const { verifyToken } = require("../helpers/jwt.helper.js");
const User = require("../models/User");

async function auth(req, res, next) {
  console.log("auth middleware");

  try {
    if (req.url.includes("users/register") || req.url.includes("users/login")) {
      // whitelisted endpoints
      next();
    } else {
      // check for Bearer auth header
      if (
        !req.headers.authorization ||
        req.headers.authorization.indexOf("Bearer ") === -1
      ) {
        console.log(`Bearer token is missing, sending 401 to client`);
        return res.status(401).send("Unauthorized Request");
      }

      // verify auth credentials
      let accessToken = req.headers.authorization.split(" ")[1];

      let decoded = null;

      if (accessToken) {
        const tokenObj = await verifyToken(accessToken);

        console.log(tokenObj);
        if (tokenObj?.success && tokenObj?.decoded) {
          decoded = tokenObj.decoded;
        } else if (!tokenObj?.success) {
          return res.status(500).json(tokenObj);
        }
      }

      if (decoded?.data?._id) {
        const result = await User.find({ id: decoded.data._id }).exec();
        if (result) {
          //attach user to request object to easily access user details further in the request lifecycle
          req.user = decoded.data;
          console.log(
            `decoded user from JWT token ${JSON.stringify(req.user)}`
          );
          next();
        } else {
          console.log("user not found");
          const response = {
            success: false,
            error: "UserNotFound",
            message: "User not found",
          };
          res.status(404).json(response);
        }
      } else {
        const response = {
          success: false,
          error: "TokenDecodingError",
          message: "Unable to decode token",
        };
        res.status(404).json(response);
      }
    }
  } catch (error) {
    const response = {
      success: false,
      error: error,
    };
    console.log(
      `Error caught in auth.middleware.js -> ${JSON.stringify(
        response
      )}, sending 500 status to client`
    );
    return res.status(500).json(response);
  }
}

module.exports = auth;
