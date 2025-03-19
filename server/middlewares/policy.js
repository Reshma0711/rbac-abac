
exports.authorize = (policy) => (req, res, next) => {
    const { project } = req;
    if (policy(req.user, project)) {
      return next();
    }
    return res.status(403).json({ status: 403, message: "Access denied" });
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