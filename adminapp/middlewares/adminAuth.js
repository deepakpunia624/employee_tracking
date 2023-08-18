const employeeSchema = require("../../models/employeeSchema");

module.exports = {
  isAdmin: async (req, res, next) => {
    const empData = await employeeSchema.findOne({
      empEmail: req.body.empEmail,
    });
    if (empData.role == "admin") {
      next();
    } else {
      res.status(401).json({
        success: false,
        message: "not auth",
      });
    }
  },
};
