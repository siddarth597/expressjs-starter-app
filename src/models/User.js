const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true },
    registeredAt: { type: Date, required: true },
    hashedPassword: { type: String, required: true },
  },
  { versionKey: false, autoIndex: true }
);
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
