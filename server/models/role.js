const mongoose = require("mongoose");

const roleSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    permissions: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const Role = mongoose.model("role", roleSchema);
module.exports = Role;
