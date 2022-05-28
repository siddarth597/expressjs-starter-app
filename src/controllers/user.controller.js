const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const { signToken } = require("../helpers/jwt.helper.js");
const { BCRYPT_SALT_ROUNDS } = process.env;

const register = async (req, res) => {
  console.log("controller method user  -> register");
  try {
    const body = req.body;

    console.log(BCRYPT_SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(
      body.password,
      parseInt(BCRYPT_SALT_ROUNDS)
    );

    //check if the user already exists
    if ((await User.findOne({ email: body.email }).countDocuments()) > 0) {
      res.status(200).json({
        success: false,
        error: "UserExists",
        message: "User already exists",
      });
      return;
    }
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: body.name,
      email: body.email,
      hashedPassword: hashedPassword,
      registeredAt: new Date(),
    });
    const result = await user.save();

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        registeredAt: user.registeredAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const login = async (req, res) => {
  console.log("controller method user  -> login");
  try {
    const body = req.body;
    const user = await User.findOne({ email: body.email });

    if (!user["_id"]) {
      res.status(404).json({
        success: false,
        error: "UserNotFound",
        message: "User does not exist",
      });
      return;
    }

    if (user["_id"]) {
      const areCredentialsValid =
        user?.hashedPassword &&
        body.password &&
        (await bcrypt.compare(body.password, user.hashedPassword));

      if (areCredentialsValid) {
        const userObj = {
          email: user.email,
          name: user.name,
          _id: user._id,
        };

        const tokenObj = await signToken(userObj);

        if (tokenObj?.success && tokenObj?.token) {
          res.status(200).json({
            success: true,
            message: "User authenticated",
            user: userObj,
            token: tokenObj.token,
          });
        } else if (!tokenObj?.success) {
          res.status(500).json(tokenObj);
        }
      } else {
        res.status(401).json({
          success: true,
          error: "InvalidCredentials",
          message: "Incorrect password",
        });
      }

      return;
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const getAllUsers = async (req, res) => {
  console.log("controller method user  -> getAllUsers");
  try {
    const result = await User.find().select({ name: 1, email: 1 });

    res.status(200).json({
      success: true,
      totalCount: result ? result.length : 0,
      items: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
};
