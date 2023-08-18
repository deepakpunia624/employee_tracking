let express = require("express");
let admin = require("../controller/adminController");
let login = require("../../employeeapp/controller/employeeController");
let {loginEmployeeValidation} = require("../../auth_validation/employee/empDataValidation");
const authService = require("../middlewares/adminAuth");

let adminRouter = express.Router();

adminRouter.post("/adminlogin",loginEmployeeValidation,authService.isAdmin,login.employeeLogin);
adminRouter.get("/presentlist",admin.empPresentList);
adminRouter.patch("/leave/:id",admin.leaveAcceptReject);

module.exports = adminRouter;
