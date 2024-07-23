const jwt = require("jsonwebtoken");
const UnAuthorizedError = require("../errors/UnAuthorizedError");

function authMiddleware(req, _, next) {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnAuthorizedError("Unauthorized");
  }

  const token = authorization.split(" ").at(1);
  if (!token) {
    throw new UnAuthorizedError("Unauthorized");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.payload = payload;
    next();
  } catch (error) {
    throw new UnAuthorizedError("Unauthorized");
  }
}

module.exports = authMiddleware;
