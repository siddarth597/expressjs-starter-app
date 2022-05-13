const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true },
    registeredAt: Date,
  },
  { versionKey: false, autoIndex: true }
);
const UserModel = mongoose.model("UserModel", UserSchema);

module.exports = UserModel;
