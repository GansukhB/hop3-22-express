const jwt = require("jsonwebtoken");

const middleware = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);

  jwt.verify(token, "secret", function (err, decoded) {
    if (err) {
      console.log(err);
      res.status(401).send({ message: "Login invalid" });
      return;
    }
    console.log(decoded);
    res.locals.userId = decoded.data._id;
    next();
  });
};

module.exports = middleware;
