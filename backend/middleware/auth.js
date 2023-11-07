const jwt = require("jsonwebtoken");
const User = require("../controller/userController");

exports.checkAuth = async (access) => {
  return async (req, res, next) => {
    try {
      let token;

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        return res.status(401).json({ msg: "Token not found", success: false });
      }

      const decode = jwt.decode(token, process.env.JWT_SECRET);
      const user = await User.findById(decode?.id);
      if (!user) {
        return res.status(401).json({ msg: "Invalid Token" });
      }

      let role = req.user.userRole;
      if (access == "isSA") {
        if (role !== 0) {
          return res
            .status(403)
            .json({ msg: "Access Denied!", success: false });
        }

        return next();
      } else if (access == "isNUser") {
        if (role !== 0 && role !== 1) {
          return res
            .status(403)
            .json({ msg: "Access Denied!", success: false });
        }

        return next();
      }

      return next();
    } catch (err) {
      console.log("error is checkAuth", err);
      return res.status(500).json({ msg: err.message, success: false });
    }
  };
};
