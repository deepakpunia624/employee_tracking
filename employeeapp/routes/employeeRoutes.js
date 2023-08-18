let express = require("express");
let employee = require("../controller/employeeController");
let{registerEmployeeValidation,loginEmployeeValidation} = require("../../auth_validation/employee/empDataValidation")
let {resetPasswordValidation,} = require("../../employeeapp/validation/empDataValidation");
const {upload} = require("../middlewares/employeeImage")
const authService = require("../../middlewares/employeeAuth");

let router = express.Router();

router.post("/create", registerEmployeeValidation, employee.createEmployee);
router.post("/login",loginEmployeeValidation,authService.isEmployee,employee.employeeLogin);
router.post("/resetpasswordemail", employee.sendEmployeeResetPasswordEmail);
router.post("/resetpassword/:id/:token",resetPasswordValidation,employee.employeeResetPassword);
router.patch("/changepassword/:id/:token", employee.changePassword);
router.patch("/updateProfilePic/:id/",upload.single("profilePic"),employee.updateProfilePic);
module.exports = router;
