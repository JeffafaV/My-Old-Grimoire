const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log("hello");
    const token = req.headers.authorization.split(" ")[1];
    console.log(`Token ${token}`);
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    console.log(`Decoded token ${decodedToken}`);
    const userId = decodedToken.userId;

    console.log(userId);

    req.auth = {
      userId: userId,
    };

    next();
  } catch {
    res.status(401).json({
      error: new Error("Invalid request"),
    });
  }
};
