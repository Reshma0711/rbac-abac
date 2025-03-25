// const projects = require("../data/project");
// const { authorize } = require("../middlewares/policy");
// const { canViewProject, canUpdateproject } = require("../policies/project");
const handlerResponse = require("../utils/handlerResponse");
const Project = require("../models/project");
const ProjectAttribute = require("../models/projectAttribute");

// Get project by ID
const getProject = async (req, res, next) => {
  try {
    // Get project ID from URL params
    const projectId = req.params.id;

    console.log(projectId);

    // Find project by ID in MongoDB
    const project = await Project.findById(projectId);

    console.log("projectttttttttttttttttttttt", project);

    // If project not found, return 404
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Attach project to request object and proceed to next middleware
    req.project = project;
    // next();
    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching project", error: error.message });
  }
};

// exports.viewProject = (req, res) => {
//   handlerResponse(res, 200, "Project retrieved successfully", req.project);
// };

// exports.updateProject = (req, res) => {
//   handlerResponse(res, 201, "Project Updated Successfully", project);
// };

const createProject = async (req, res, next) => {
  try {
    const { name, description, department, team, attributes } = req.body;

    // Validate required fields
    if (!name || !description || !department || !attributes) {
      return handlerResponse(res, 400, "All required fields must be filled");
    }

    // Create a new project
    const newProject = new Project({
      name,
      description,
      department,
      team,
      createdBy: req.user.id, // Admin who creates the project
    });

    // Save project to DB
    const savedProject = await newProject.save();

    // Create project attributes and save to DB
    const newProjectAttribute = new ProjectAttribute({
      projectId: savedProject._id,
      attributes,
    });

    await newProjectAttribute.save();

    // Return success response with project and attributes
    return res.status(201).json({
      message: "Project created successfully",
      project: savedProject,
      attributes: newProjectAttribute.attributes,
    });
  } catch (error) {
    console.error("Error creating project:", error.message);
    next(error);
  }
};

// @desc Update project and its attributes by admin
// @route PUT /api/projects/:id
const updateProject = async (req, res, next) => {
  try {
    const { name, description, department, team, attributes } = req.body;
    const { id } = req.params;

    // Check if project exists
    const project = await Project.findById(id);
    if (!project) {
      console.log("Project not found with ID:", id);
      return res.status(404).json({ message: "Project not found" });
    }

    // Log incoming data for debugging
    console.log("Incoming project update data:", req.body);

    // Update project fields conditionally
    if (name) {
      project.name = name;
    }
    if (description) {
      project.description = description;
    }
    if (department) {
      project.department = department;
    }
    if (team && Array.isArray(team)) {
      project.team = team;
    }

    // Save the updated project
    const updatedProject = await project.save();
    console.log("Project updated successfully:", updatedProject);

    // Handle attributes update
    let projectAttributes = await ProjectAttribute.findOne({ projectId: id });

    if (attributes) {
      if (projectAttributes) {
        // If attributes exist, update them
        projectAttributes.attributes = attributes;
        await projectAttributes.save();
        console.log("Attributes updated successfully:", projectAttributes);
      } else {
        // Create new attributes if not found
        projectAttributes = new ProjectAttribute({
          projectId: updatedProject._id,
          attributes,
        });
        await projectAttributes.save();
        console.log("New attributes created successfully:", projectAttributes);
      }
    } else {
      console.log("No attributes provided, skipping attributes update.");
    }

    // Return success response with updated project and attributes
    res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
      attributes:
        attributes || projectAttributes?.attributes || "No attributes updated",
    });
  } catch (error) {
    console.error("Error updating project:", error.message);
    res.status(500).json({
      message: "Error updating project",
      error: error.message,
    });
  }
};


// @desc Delete project and its attributes by admin
// @route DELETE /api/projects/:id
const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if project exists
    const project = await Project.findById(id);
    if (!project) {
      return handlerResponse(res, 404, "Project not found");
    }

    // Delete project and its attributes
    await Project.deleteOne({ _id: id });
    await ProjectAttribute.deleteOne({ projectId: id });

    res.json({ message: "Project and its attributes deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error.message);
    next(error);
  }
};

module.exports = { createProject, getProject, updateProject, deleteProject };
