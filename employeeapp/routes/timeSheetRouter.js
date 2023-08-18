let express = require("express");
let timesheet = require("../controller/TimeSheetController");

let router = express.Router();

router.post("/clockin/:id", timesheet.empClockIn);
router.patch("/clockout/:id", timesheet.empClockOut);

module.exports = router;
