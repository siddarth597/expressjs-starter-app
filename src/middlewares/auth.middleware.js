let jwt = require("jsonwebtoken");
const util = require("util");

const jwtVerify = util.promisify(jwt.verify);

const User = require("../models/User");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

async function auth(req, res, next) {
  console.log(`auth middleware`);

  try {
    if (req.url.includes("user/register")) {
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
      console.log("oauth accessToken", accessToken);
      let decoded = null;
      if (accessToken) {
        try {
          decoded = await jwtVerify(accessToken, JWT_SECRET_KEY);
        } catch (error) {
          res.status(401).send(error);
          return;
        }
      }
      if (decoded) {
        const result = await User.find({ id: decoded._id }).exec();
        if (result) {
          //attach user to request object
          req.user = decoded;
          console.log(
            `decoded user from JWT token ${JSON.stringify(req.user)}`
          );
          next();
        } else {
          res.status(404).send("User not Found");
        }
      }
    }
  } catch (error) {
    const response = {
      success: false,
      error: error,
    };
    console.log(
      `Error caught in auth.helper.js -> ${JSON.stringify(
        response
      )}, sending 500 status to client`
    );
    return res.status(500).json(response);
  }
}

module.exports = auth;
