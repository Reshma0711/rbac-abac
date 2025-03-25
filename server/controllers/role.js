const Role = require('../models/role');

// ✅ Create Role with Dynamic Permissions
exports.createRole = async (req, res) => {
  const { name, permissions } = req.body;

  try {
    // Check if role already exists
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(400).json({ message: 'Role already exists' });
    }

    // Validate permissions (optional validation)
    if (typeof permissions !== 'object' || !Object.keys(permissions).length) {
      return res.status(400).json({ message: 'Invalid or empty permissions provided' });
    }

    // Create new role with dynamic permissions
    const newRole = new Role({
      name,
      permissions
    });

    await newRole.save();
    res.status(201).json({ message: 'Role created successfully', newRole });
  } catch (error) {
    res.status(500).json({ message: 'Error creating role', error: error.message });
  }
};

// ✅ Get All Roles (Optional for Admin to View Roles)
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching roles', error: error.message });
  }
};

// ✅ Update Role by ID
exports.updateRole = async (req, res) => {
    const { id } = req.params;
    const { name, permissions } = req.body;
  
    try {
      // Check if the role exists
      const role = await Role.findById(id);
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }
  
      // Check if role name is being updated and if it already exists
      if (name && name !== role.name) {
        const existingRole = await Role.findOne({ name });
        if (existingRole) {
          return res.status(400).json({ message: 'Role with this name already exists' });
        }
      }
  
      // Validate permissions (optional validation)
      if (permissions && (typeof permissions !== 'object' || !Object.keys(permissions).length)) {
        return res.status(400).json({ message: 'Invalid or empty permissions provided' });
      }
  
      // Update role details
      role.name = name || role.name;
      role.permissions = permissions || role.permissions;
  
      await role.save();
      res.status(200).json({ message: 'Role updated successfully', role });
    } catch (error) {
      res.status(500).json({ message: 'Error updating role', error: error.message });
    }
  };

// ✅ Delete Role by ID
exports.deleteRole = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Check if the role exists
      const role = await Role.findById(id);
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }
  
      // Delete the role
      await Role.findByIdAndDelete(id);
      res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting role', error: error.message });
    }
  };
  
  