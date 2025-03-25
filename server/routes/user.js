const express = require("express");
const {
  //   registerUser,
  loginUser,
  getUserProfile,
  createUserByAdmin,
  updateProfile,
  deleteProfile,
} = require("../controllers/user");
const { authentication } = require("../middlewares/auth");
const { verifyAdmin, checkPermission } = require("../middlewares/role");
const router = express.Router();

// Admin Creates User with Credentials
router.post("/create", authentication, checkPermission("employee", "read"), createUserByAdmin);

// User Login
router.post("/login", loginUser);

// Get User Profile
router.get("/:id", authentication, getUserProfile);

// update Profile
router.put("/:id", authentication, updateProfile);

// delete Profile
router.delete("/:id", authentication, verifyAdmin, deleteProfile);

module.exports = router;
