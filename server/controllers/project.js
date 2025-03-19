const projects = require("../data/project");
const { authorize } = require("../middlewares/policy");
const { canViewProject, canUpdateproject } = require("../policies/project");
const handlerResponse = require("../utils/handlerResponse");

// exports.viewProject = (req, res) => {
//   const projectId = parseInt(req.params.id);
//   const project = getProjectById(projectId, res);
//   if (!project) return; // Exit if project is not found

//   authorize(canViewProject, project)(req, res, () => {
//     handlerResponse(res, 200, "Project retrieved Successfully", project);
//   });
// };

exports.getProject = (req, res, next) => {
  const projectId = parseInt(req.params.id);
  const project = projects.find((project) => project.id === projectId);
  if (!project) {
    handlerResponse(res, 404, "Project not found");
  }
  req.project = project;
  next();
};

exports.viewProject = (req, res) => {
  handlerResponse(res, 200, "Project retrieved successfully", req.project);
};

exports.updateProject = (req, res) => {
  handlerResponse(res, 201, "Project Updated Successfully", project);
};
