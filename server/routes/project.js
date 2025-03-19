const express=require("express");
const { verifyToken } = require("../middlewares/auth");
const {authorize} = require("../middlewares/policy")
const { viewProject, updateProject,getProject } = require("../controllers/project");
const { canViewProject, canUpdateproject } = require("../policies/project");
const router=express.Router()


router.get("/:id", verifyToken, getProject, authorize(canViewProject), viewProject);

router.get("/:id", verifyToken, getProject, authorize(canUpdateproject),updateProject);


module.exports=router;