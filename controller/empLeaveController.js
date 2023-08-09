let empLeaveSchema = require("../models/empLeaveSchema");
const empLeaveLogger = require('../utils/empLeaveLogger')

module.exports = {
    //......empleave API.........
        empLeave: async (req, res) => {
            const empId = req.params.id;
            const leaveData = new empLeaveSchema(req.body)
            try {
                leaveData.empId = empId
                await leaveData.save();
                if (leaveData.empLeaveType === "casual") {
                    empLeaveLogger.log('info', "Applied for casual leave")
                    res.status(200).json({
                        success: true,
                        message: "Applied for casual leave",
                        leaveInfo: leaveData
                    })
                } else if (leaveData.empLeaveType === "sick") {
                    empLeaveLogger.log('info', "Applied for sick leave")
                    res.status(200).json({
                        success: true,
                        message: "Applied for sick leave",
                        leaveInfo: leaveData
                    })
                }
                else {
                    empLeaveLogger.log('info', "Applied for other leave")
                    res.status(200).json({
                        success: true,
                        message: "Applied for other leave",
                        leaveInfo: leaveData
                    })
                }leaveData.endDate = req.body.endDate
                leaveData.startDate = req.body.startDate
            }
            catch (error) {
                empLeaveLogger.log('error', error.message)
                res.status(500).json({
                    success: false,
                    message: error.message,
                })
            }
        }
    
    }

