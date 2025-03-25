// ✅ Middleware to Authorize Based on Policy
const authorize = (policy) => async (req, res, next) => {
  // Check if the policy allows the user to perform the action
  const isAuthorized = await policy(req.user);
  if (isAuthorized) {
    return next();
  }

  // Deny access if the policy fails
  return res.status(403).json({ status: 403, message: 'Access denied' });
};

  
// exports.authorize=(policy, resource)=>(req,res,next)=>{
//         const user=req.user;
//         if(policy(user, resource)){
//              return next();
//         }
//         else{
//             return res.status(403).json({
//                 status:403,
//                 message:"Access denied"
//             })
//         }
// }

module.exports={authorize}