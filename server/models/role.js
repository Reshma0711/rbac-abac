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



// const roleSchema = mongoose.Schema(
//   {
//     roleName: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     permissions: [
//       {
//         module: {
//           type: String,
//           required: true,
//           trim: true,
//         },
//         canRead: {
//           type: Boolean,
//           default: false,
//         },
//         canCreate: {
//           type: Boolean,
//           default: false,
//         },
//         canUpdate: {
//           type: Boolean,
//           default: false,
//         },
//         canDelete: {
//           type: Boolean,
//           default: false,
//         },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Role", roleSchema);
