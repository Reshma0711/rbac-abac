const express = require("express");
const { verifyToken } = require("../middlewares/auth");
// const {authorize} = require("../middlewares/policy");
const { authentication } = require("../middlewares/auth");
const { createProject, getProject, updateProject, deleteProject } = require("../controllers/project");
const { verifyAdmin } = require("../middlewares/role");
const {checkPermission}= require("../middlewares/role")
// const { viewProject, updateProject,getProject } = require("../controllers/project");
// const { canViewProject, canUpdateproject } = require("../policies/project");
const router = express.Router();



router.get("/:id", authentication, checkPermission("project", "read"), getProject);
router.post("/", authentication, checkPermission("project", "create"), createProject);
router.put("/:id", authentication, checkPermission("project", "update"), updateProject);
router.delete("/:id", authentication, checkPermission("project", "delete"), deleteProject);



// router.put("/:id", authentication, verifyAdmin, update);

// router.delete("/:id", authentication, verifyAdmin, delete);

// router.get("/:id", verifyToken, getProject, authorize(canViewProject), viewProject);

// router.put("/:id", verifyToken, getProject, authorize(canUpdateproject),updateProject);

// router.post("/create",verifyToken,authorize(),createProject);

module.exports = router;
