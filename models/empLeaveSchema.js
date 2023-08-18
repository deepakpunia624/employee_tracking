const { date } = require("joi");
const mongoose = require("mongoose");

const empLeaveSchema = new mongoose.Schema({
  empTotalLeave: {
    type: String,
    default: true,
  },
  empCasualLeave: {
    type: String,
    default: "10",
  },
  empSickLeave: {
    type: String,
    default: "10",
  },
  empLeaveType: {
    type: String,
    default: "casual",
  },
  empId: {
    type: mongoose.Types.ObjectId,
    ref: "employee",
    required: true,
  },
  startDate: {
    type: Date,
    default: "",
  },
  endDate: {
    type: Date,
    default: "",
  },
  empStatus: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: "pending",
  },
  empMessage: {
    type: String,
    default: "",
  },
  isActive: {
    type: String,
    default: true,
  },
});
empLeaveSchema.set("timestamps", true);
module.exports = mongoose.model("empleave", empLeaveSchema);
