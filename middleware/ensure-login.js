const jwt = require("jsonwebtoken");
const { user } = require("../models/index");

module.exports = ensureLogin = async (req, res, next) => {
  //   const getTokenFrom = (request) => {
  //     const authorization = request.get("authorization");
  //     if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
  //       return authorization.substring(7);
  //     }
  //     return next({
  //       message: "You need to be logged in to visit this route",
  //       statusCode: 401,
  //     }); // look at this
  // }
  if (!req.headers.authorization) {
    return next({
      message: "You need to be logged in to visit this route",
      statusCode: 401,
    });
  }

  const token = req.headers.authorization.replace("Bearer", "").trim();

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const getUser = await user.findOne({
      where: {
        id: decodedToken.id,
      },
    });

    req.user = getUser;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "invalid token" });
    }

    next({
      message: "You need to be logged in to visit this route",
      statusCode: 401,
    });
  }
};
