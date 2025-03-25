const express = require("express");
const {
  createRole,
  getAllRoles,
  updateRole,
  deleteRole,
} = require("../controllers/role");
const { verifyAdmin } = require("../middlewares/role");
const { authentication } = require("../middlewares/auth");

const router = express.Router();

//  CRUD Routes (Admin Only)
router.post("/create", authentication,verifyAdmin, createRole); // Create Role
router.get("/", authentication, verifyAdmin, getAllRoles); // Get All Roles
router.put("/:id", authentication, verifyAdmin, updateRole); // update Role
router.delete("/:id", authentication, verifyAdmin, deleteRole); // delete Role

module.exports = router;
