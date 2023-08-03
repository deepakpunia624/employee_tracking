let express = require("express")
let employee = require("../controller/employeeController")
let {registerEmployeeValidation,loginEmployeeValidation,resetPasswordValidation} = require('../validation/employee/empDataValidation')
//const {upload} = require("../middlewares/employeeImage")

let router = express.Router()

router.post('/create',registerEmployeeValidation,employee.createEmployee)
router.post('/login',loginEmployeeValidation,employee.employeeLogin)
router.post('/resetpasswordemail',employee.sendEmployeeResetPasswordEmail)
router.post('/resetpassword/:id/:token',resetPasswordValidation,employee.employeeResetPassword)
module.exports = router