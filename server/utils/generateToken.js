const jwt=require("jsonwebtoken")
const jwtsecretkey=process.env.JWT_SECRET_KEY||"rbacabac"





    exports.generateToken = (id) => {
      const token= jwt.sign({ id }, jwtsecretkey, { expiresIn: '30d' });
      console.log("tokennnnnnnnnnnnnnnnnn",token)
      return token
    };
    
    
    
    