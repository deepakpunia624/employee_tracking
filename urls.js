let express = require("express")

const employeeRouter = require('./employeeapp/routes/employeeRoutes')
const timeSheetRouter = require('./employeeapp/routes/timeSheetRouter')
const empLeaveRouter = require('./employeeapp/routes/empLeaveRouter')
const empNotificatinRouter = require('./employeeapp/routes/notificationRouter')
const adminRoute =require('./adminapp/routes/adminRouter')
const benchRoute = require('./adminapp/routes/benchRouter')
const adminNotificatioRoute = require('./adminapp/routes/notificationRouter')

let commonRouter = express.Router()

commonRouter.use('/employee',employeeRouter)
commonRouter.use('/timesheet',timeSheetRouter)
commonRouter.use('/leave',empLeaveRouter)
commonRouter.use('/notification',empNotificatinRouter)
commonRouter.use('/admin',adminRoute)
commonRouter.use('/bench',benchRoute)
commonRouter.use('/notification',adminNotificatioRoute)

module.exports = commonRouter
