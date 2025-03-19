const jwt=require("jsonwebtoken")
const jwtsecretkey=process.env.JWT_SECRET_KEY||"rbacabac"
const user={
    id:1,
    name:"john",
    role:"manager",
    department:"Hr",
    accessLevel:5,
}

const token=jwt.sign(user,jwtsecretkey,{ expiresIn:"1h"})

console.log("JWT TOKEN",token)