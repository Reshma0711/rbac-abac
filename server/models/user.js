const mongoose = require("mongoose");
const Role = require("../models/role");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "role" },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);
module.exports = User;
