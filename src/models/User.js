const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true },
    registeredAt: { type: Date, required: true },
    hashedPassword: { type: String, required: true },
    role: { type: String, required: false, default: "user" }, // currently this is set from the database for ease of implementation
  },
  { versionKey: false, autoIndex: true }
);
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
