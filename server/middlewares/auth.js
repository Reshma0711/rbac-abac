const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;

exports.verifyToken = (req, res, next) => {
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
