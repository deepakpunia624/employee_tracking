const { string } = require("joi")
const mongoose = require("mongoose")

const empTimeSheetSchema = new mongoose.Schema({
    empClockIn : {
        type : String,
        default : "",
    },
    empClockOut : {
        type : String,
        default : "",
    },
    empClockInIP: {
        type : String,
        default : "",
    },
    empHoursLoggedIn : {
        type : String,
        default : "0",
    },
    empWorkingFrom : {
        type : String,
        default : "office",
    },
    empTotalWorkingDays : {
        type : String,
        default : "0",
    },
    empDaysPresent : {
        type : String,
        default : "",
    },
    empHalfDay : {
        type : String,
        default : "",
    },
    empDaysAbsent : {
        type : String,
        default : "",
    },
    empHolidays : {
        type : String,
        default : "employee",
    },
    empDaysLate : {
        type : String,
        default : "",
    },
    empAttendanceStatus : {
        type : String,
        default : "",
    },
    empId : {
        type : mongoose.Types.ObjectId,
        ref:"employee",
        required : true,
    },
    empStatus : {
        type : String,
        default : "absent",
    },
    isActive : {
        type : String,
        default : "",
    },
    
})
empTimeSheetSchema.set('timestamps',true)
module.exports = mongoose.model('timesheet',empTimeSheetSchema)