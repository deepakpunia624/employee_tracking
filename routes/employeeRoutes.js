let express = require("express")
let employee = require("../controller/employeeController")
let {registerEmployeeValidation,loginEmployeeValidation,resetPasswordValidation} = require('../validation/employee/empDataValidation')
//const {upload} = require("../middlewares/employeeImage")
const authService = require('../middlewares/employeeAuth')

let router = express.Router()

router.post('/create',registerEmployeeValidation,employee.createEmployee)
router.post('/login',loginEmployeeValidation,authService.isEmployee,employee.employeeLogin)
router.post('/resetpasswordemail',employee.sendEmployeeResetPasswordEmail)
router.post('/resetpassword/:id/:token',resetPasswordValidation,employee.employeeResetPassword)
router.post('/changepassword/:id/:token',employee.changePassword)

module.exports = router