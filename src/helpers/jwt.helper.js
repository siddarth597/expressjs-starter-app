const util = require("util");
const md5 = require("md5");
const fs = require("fs");
const path = require("path");
let jwt = require("jsonwebtoken");
const jwtVerify = util.promisify(jwt.verify);
const jwtSign = util.promisify(jwt.sign);

const { JWT_EXPIRY_TIME_IN_MINUTES, JWT_ISSUER } = process.env;

const verifyToken = async (token) => {
  console.log("jwt.helper.js method -> verifyToken");
  let decoded = null;
  try {
    const publicKey = fs.readFileSync(
      path.join(__dirname, "../jwt-keys/es512-public.pem"),
      "utf8"
    );

    decoded = await jwtVerify(token, publicKey, {
      algorithm: "ES512",
      issuer: JWT_ISSUER,
    });
    return { success: true, decoded };
  } catch (error) {
    console.error(`Error in jwt.helper.js -> verifyToken : ${error}`);

    return {
      success: false,
      ...error,
    };
  }
};

const signToken = async (user) => {
  console.log("jwt.helper.js method -> signToken");
  try {
    const data = {
      iss: JWT_ISSUER,
      sub: user["_id"], // using user id as the token subject
      exp:
        Math.floor(Date.now() / 1000) +
        60 * parseInt(JWT_EXPIRY_TIME_IN_MINUTES),
      nbf: Math.floor(Date.now() / 1000),
      jti: md5(JSON.stringify(user) + Date.now()), // creating an unique identifier for the token using hash of user details and current timestamp
      data: { ...user }, // basic details of the user
    };

    const privateKey = fs.readFileSync(
      path.join(__dirname, "../jwt-keys/es512-private.pem"),
      "utf8"
    );

    const token = await jwtSign(data, privateKey, { algorithm: "ES512" });

    return { success: true, token };
  } catch (error) {
    console.error(`Error in jwt.helper.js -> signToken : ${error}`);
    return {
      success: false,
      ...error,
    };
  }
};

module.exports = { verifyToken, signToken };
