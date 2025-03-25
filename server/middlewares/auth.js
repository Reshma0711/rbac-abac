const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const handlerResponse = require("../utils/handlerResponse");

const User = require("../models/user"); // Correct path to User model

const authentication = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token after 'Bearer'
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, jwtSecretKey);

      // Find user by decoded ID and exclude password
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next(); // Move to the next middleware
    } catch (error) {
      console.error("Token verification error:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

const verifyToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "No token,authorization denied",
      });
    }

    try {
      const decode = jwt.verify(token, jwtSecretKey);
      req.user = decode;
      next();
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: "Token is not valid",
        error: err.message,
      });
    }
  } else {
    res.status(400).json({
      status: 400,
      message: "no token,authorization denied",
      error: err.message,
    });
  }
};

module.exports = { authentication, verifyToken };
