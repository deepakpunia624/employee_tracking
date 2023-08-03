let express = require("express")

const employeeRouter = require('./employeeRoutes')

let commonRouter = express.Router()

commonRouter.use('/employee',employeeRouter)

module.exports = commonRouter