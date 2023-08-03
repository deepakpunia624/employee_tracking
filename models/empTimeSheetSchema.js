const mongoose = require("mongoose")

const empTimeSheetScchema = new mongoose.Schema({
    clockIn : {
        type : String,
        required : true,
    },
    clockOut : {
        type : String,
        required : true,
    },
    clockInIP : {
        type : String,
        required : true,
    },
    hoursLoggedIn : {
        type : String,
        required : true,
    },
    workingFrom : {
        type : String,
        required : true,
    },
    totalWorkingDays : {
        type : String,
        required : true,
    },
    daysPresent : {
        type : String,
        required : true,
    },
    halfDay : {
        type : String,
        required : true,
    },
    daysAbsent : {
        type : String,
        required : true,
    },
    holidays : {
        type : String,
        required : true,
    },
    daysLate : {
        type : String,
        required : true,
    },
    attendanceStatus : {
        type : String,
        required : true,
    },
    emp_id : {
        type : mongoose.Types.ObjectId,ref:"employee",
        required : true,
    },
    status : {
        type : String,
        required : true,
    },
    isActive : {
        type : String,
        required : true,
    },
    
})
empTimeSheetScchema.set('timestamps',true)
module.exports = mongoose.model('timesheet',empTimeSheetScchema)