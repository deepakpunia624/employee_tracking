let express = require("express")
let admin = require("../controller/adminController")
let login = require('../../controller/employeeController')
let {loginEmployeeValidation} = require('../../validation/employee/empDataValidation')
const authService = require('../middlewares/adminAuth')

let adminRouter = express.Router()

adminRouter.post('/adminlogin',loginEmployeeValidation,authService.isAdmin,login.employeeLogin)

module.exports = adminRouter