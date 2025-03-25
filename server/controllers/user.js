const User = require("../models/user");
const Role = require("../models/role");
const UserAttribute=require("../models/userAttribute")
const { generateToken } = require("../utils/generateToken");
const bcrypt = require("bcrypt");
const handlerResponse = require("../utils/handlerResponse");

// // @desc Register new user
// // @route POST /api/users/register
// const registerUser = async (req, res, next) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // Check if user already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Create new user
//     const user = await User.create({
//       name,
//       email,
//       password,
//       role,
//     });

//     if (user) {
//       res.status(201).json({
//         _id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         token: generateToken(user.id),
//       });
//     } else {
//       res.status(400).json({ message: 'Invalid user data' });
//     }
//   } catch (error) {
//     next(error); // Pass error to error handling middleware
//   }
// };

// @desc Create user by Admin
// @route POST /api/users/create

// @desc Create user by Admin
// @route POST /api/users/create
const createUserByAdmin = async (req, res, next) => {
  try {
    const { name, email, password, roleId, attributes } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return handlerResponse(res, 400, "User with this email already exists");
    }

    // Check if role is valid
    const role = await Role.findById(roleId);
    if (!role) {
      return handlerResponse(res, 404, "Role not found");
    }

    // Generate hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    // Create user with credentials assigned by admin
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role._id,
    });

    // Save the new user
    const savedUser = await newUser.save();

    // Create user attributes and link with the userId
    const newAttributes = new UserAttribute({
      userId: savedUser._id,
      attributes, // Make sure `attributes` is sent in the request body
    });

    // Save attributes
    const savedAttributes = await newAttributes.save();

    // Return success response
    if (savedUser && savedAttributes) {
      return res.status(201).json({
        message: "Employee created successfully",
        user: {
          _id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
          role: role.name, // Use role name for readability
        },
        attributes: savedAttributes,
      });
    } else {
      return handlerResponse(res, 400, "Error creating user or attributes");
    }
  } catch (error) {
    console.error("Error creating user by admin:", error.message);
    next(error);
  }
};



// @desc Auth user & get token
// @route POST /api/users/login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user and populate role
    const user = await User.findOne({ email }).populate("role")

    const token = generateToken(user.id); // Generate token

    console.log("Generated Token:", token); // Debugging

    if (user && (await bcrypt.compare(password, user.password))) {
      return res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name,
        token: token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
};

// @desc Get user profile
// @route GET /api/users/profile
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("role");

    if (user) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};



// @desc Update user by admin
// @route PUT /api/users/:id
const updateProfile= async (req, res, next) => {
  try {
    const { name, email, password, roleId, attributes } = req.body;
    const { id } = req.params;

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return handlerResponse(res, 404, "User not found");
    }

    // Check if role is valid
    if (roleId) {
      const role = await Role.findById(roleId);
      if (!role) {
        return handlerResponse(res, 404, "Role not found");
      }
      user.role = role._id;
    }

    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;

    // Update password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save updated user
    const updatedUser = await user.save();

    // Update user attributes if provided
    if (attributes) {
      let userAttributes = await UserAttribute.findOne({ userId: id });

      if (userAttributes) {
        userAttributes.attributes = attributes;
        await userAttributes.save();
      } else {
        // Create attributes if not found
        userAttributes = new UserAttribute({
          userId: updatedUser._id,
          attributes,
        });
        await userAttributes.save();
      }
    }

    // Return success response
    return res.json({
      message: "User updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: roleId ? (await Role.findById(roleId)).name : user.role.name,
      },
      attributes: attributes || "No attributes updated",
    });
  } catch (error) {
    console.error("Error updating user by admin:", error.message);
    next(error);
  }
};



// @desc Delete user by admin
// @route DELETE /api/users/:id
const deleteProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return handlerResponse(res, 404, "User not found");
    }

    // Delete user attributes
    await UserAttribute.deleteOne({ userId: id });

    // Delete the user
    await user.deleteOne();

    // Return success response
    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user by admin:", error.message);
    next(error);
  }
};



module.exports = {
  // registerUser,
  createUserByAdmin,
  loginUser,
  getUserProfile,
  updateProfile,
  deleteProfile
};









