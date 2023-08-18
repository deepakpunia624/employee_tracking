let express = require("express");
let leave = require("../controller/empLeaveController");
let leaveRouter = express.Router();

leaveRouter.post("/empleave/:id", leave.empLeave);

module.exports = leaveRouter;
