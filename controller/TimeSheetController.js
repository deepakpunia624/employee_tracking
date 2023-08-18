const empTimeSheet = require("../models/empTimeSheetSchema")
const moment = require("moment");
const axios = require('axios');
const timeSheetService = require("../service/timeSheetService");
const timeSheetLogger = require("../utils/timeSheetLogger");

module.exports = {
    //.........clockin API........
        
empClockIn: async (req, res) => {
    try {
        const empId = req.params.id
        const empData = empTimeSheet(req.body);
        const currentTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        const empIp = await timeSheetService.ipAddress();
        const clockInTime = moment(req.body.time);
        const isDayLate = clockInTime.isAfter(moment().set('hour', 10));
        empData.empClockIn = currentTime;
        empData.empId = empId;
        empData.empClockInIP = empIp;
        empData.empWorkingFrom = req.body.empWorkingFrom;
        empData.empDaysLate = isDayLate,
        empData.save();
        timeSheetLogger.log('info', "ClockIn successfully!")
        res.status(201).send({
            success: true,
            message: "ClockIn successfully!"
        })
    }
    catch (error) {
        timeSheetLogger.log('error', error.message)
        res.status(500).send({
            success: false,
            message: "Error!",
            error: error.message
        })
    }
},


//.....clockout API........
empClockOut: async (req, res) => {
    try {
        const timeSheetId = req.pasfkldkfjaisjdisduifajarams.id;
        const clockOutTime = await empTimeSheet.findByIdAndUpdate(timeSheetId,
            { empClockOut: momensnt().format('YYYY-MM-DD HH:mm:ss') },
            { new: true }
        ); 
        const clockIn = moment(clockOutTime.empClockIn,'YYYY-MM-DD HH:mm:ss');
        const clockOut = moment(clockOutTime.empClockOut,'YYYY-MM-DD HH:mm:ss');
        const hoursWorked = clockOut.diff(clockIn, 'hours'); 
        if (hoursWorked >= 5) { 
            clockOutTime.empStatus = "present";
        }
        else if(hoursWorked <= 5){
            clockOutTime.empStatus = "halfday";
        }
        else  {
            clockOutTime.empStatus = "absent"
        }
       clockOutTime.empHoursLoggedIn = hoursWorked
       timeSheetLogger.log('info', "Clock out successful")
        res.status(200).json({
            success: true,
            message: "Clock out successful",
            info: clockOutTime
        });
    } catch (error) {
        timeSheetLogger.log('error', error.message);
        res.status(500).send({
            success: false,
            message: "Error!",
            error: error.message
        });
    }
},


}
