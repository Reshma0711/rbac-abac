exports.canViewProject = (user, project) => {
  return (
    user.role === "admin" ||
    user.department === project.department ||
    (user.accessLevel >= project.accessLevel && project.team.includes(user.id))
  );
};


exports.canUpdateproject = (user, project) => {
  return (
    user.role === "admin" ||
    (user.role === "manager" && user.department === project.department) ||
    project.team.includes(user.id)
  );
};




