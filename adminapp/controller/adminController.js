let empTimeSheetSchema = require("../../models/empTimeSheetSchema");
let empLeaveSchema = require("../../models/empLeaveSchema");
let employeeSchema = require("../../models/employeeSchema")
const mailOption  = require("../../commonEmailService");

module.exports = {
  //.....present list of employee API.....
  empPresentList: async (req, res) => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const empData = await empTimeSheetSchema
        .find(
          {
            createdAt: {
              $gte: new Date(`${today} 00:00:00`),
              $lte: new Date(`${today} 23:59:59`),
            },
          },
          { _id: 0, empClockIn: 1, empClockOut: 1 }
        )
        .populate({
          path: "empId",
          select: "empName",
        });
      res.status(201).json({
        success: true,
        message: "All present employee list",
        Data: empData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

//......leave accept or reject API.........
  leaveAcceptReject: async (req, res) => {
    try {
      const { id } = req.params;
      const { empStatus,empMessage } = req.body;
      const type = await empLeaveSchema.findById(id);
      const employee = await employeeSchema.findById(type.empId)
      const leave = await empLeaveSchema.findByIdAndUpdate(id,{ empStatus,empMessage },{ new: true });
      const user = await empLeaveSchema.findById(leave.id);
      let subject = "";
      if (empStatus === "accepted") {
        if (type.empLeaveType === "casual") {
          user.empCasualLeave -= 1;
        }
        subject = "Leave Approved"
      }else{
        subject = "Leave Rejected"
      }
      if (empStatus === "accepted") {
        if (type.empLeaveType === "sick") {
          user.empSickLeave -= 1;
        }
      }
      await Promise.all([leave.save(), user.save()]);
      await mailOption(employee.empEmail,subject,empStatus,empMessage)
      res.status(201).json({
        success: true,
        message: "Leave status update ",
        leave: leave,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
}
  