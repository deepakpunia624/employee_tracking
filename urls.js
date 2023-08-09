let express = require("express")

const employeeRouter = require('./routes/employeeRoutes')
const timeSheetRouter = require('./routes/timeSheetRouter')
const empLeaveRouter = require('./routes/empLeaveRouter')
const empNotificatinRouter = require('./routes/notificationRouter')
const adminRoute =require('./adminapp/routes/adminRouter')


let commonRouter = express.Router()

commonRouter.use('/employee',employeeRouter)
commonRouter.use('/timesheet',timeSheetRouter)
commonRouter.use('/leave',empLeaveRouter)
commonRouter.use('/notification',empNotificatinRouter)
commonRouter.use('/admin',adminRoute)

module.exports = commonRouter