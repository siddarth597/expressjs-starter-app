const mongoose = require("mongoose");
const User = require("../models/User");

const createUser = async (req, res) => {
  console.log("controller method user  -> createUser");
  try {
    const body = req.body;
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: body.name,
      email: body.email,
      registeredAt: new Date().toISOString(),
    });
    const result = await user.save();

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const deleteUser = async (req, res) => {
  //deleteUser api logic here
  console.log("controller method user  -> deleteUser");
  try {
    const id = req.params["id"];
    if (!id) {
      res.status(400).json({ error: "Id is missing in path params" });
    }

    const result = await User.deleteOne({ _id: id }).exec();

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const getAllUsers = async (req, res) => {
  console.log("controller method user  -> getAllUsers");
  try {
    const result = await User.find().exec();

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const UserController = {
  createUser,
  deleteUser,
  getAllUsers,
};

module.exports = UserController;
