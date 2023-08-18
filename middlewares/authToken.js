const jwt = require("jsonwebtoken");

module.exports = {
  employeeAuthentication: async (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      let token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(401).json({
            success: false,
            message: "Employee is not authoreized",
          });
        } else {
          req.employee = decoded.empData;
          console.log(decoded.empData);
          next();
        }
      });
    } else {
      res.status(409).json({
        success: false,
        message: "token is not found",
      });
    }
  },
};
