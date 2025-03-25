const User=require("../models/user")
const Role=require("../models/role")

const checkPermission = (resource, action) => {
    return async (req, res, next) => {
      try {
        // Find user by ID and get their role
        const user = await User.findById(req.user.id).populate("role");
  
        // Check if user or role is missing
        if (!user || !user.role || !user.role.permissions) {
          return res.status(403).json({ message: "Access denied" });
        }
  
        // Get permissions for the resource
        const permissions = user.role.permissions[resource] || [];
  
        // Check if the required action is allowed
        if (permissions.includes(action)) {
          next(); // Permission granted, move to the next middleware
        } else {
          res.status(403).json({ message: `Permission denied for ${action} on ${resource}` });
        }
      } catch (error) {
        res.status(500).json({ message: "Error while checking permissions" });
      }
    };
  };
  

// Check if the user is an Admin
const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('role');
    if (user.role.name === 'admin') {
        console.log("checkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
      return next();
    }
    return res.status(403).json({ message: 'Only admins can perform this action!' });
  } catch (error) {
    res.status(500).json({ message: 'Error in admin validation', error
     });
  }
};



module.exports = { checkPermission, verifyAdmin };
