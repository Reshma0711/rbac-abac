const UserAttribute = require('../models/userAttribute');

// ✅ Policy to Check if Admin Can Create Employee (10+ Years of Experience)
const canCreateEmployee = async (user) => {
  // Check if user has attributes
  const userAttributes = await UserAttribute.findOne({ userId: user._id });

  // Check if user is admin and has 10+ years of experience
  if (user.role.name === 'admin' && userAttributes?.attributes.experience >= 10) {
    return true;
  }
  return false;
};


module.exports={canCreateEmployee}
