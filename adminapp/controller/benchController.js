let employeeSchema = require('../../models/employeeSchema')

module.exports = {
    showEmployees: async (req, res) => {
      try {
        const empData = await employeeSchema.find(
          { role: "employee" },
          { _id: 0, empName: 1, empEmail: 1, empWorkingStatus: 1, updatedAt: 1 }
        );
        res.status(200).json({
          success: true,
          message: "Employee list fetched successfully",
          empData: empData,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    },
  
    updateEmpStatus: async (req, res) => {
      try {
        const { empEmail, empWorkingStatus } = req.body;
        const empData = await employeeSchema.findOneAndUpdate(
          { empEmail: empEmail },
          { empWorkingStatus: empWorkingStatus },
          { new: true }
        );
        res.status(201).json({
          success: true,
          message: "Working status updated successfully",
          empData: empData,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    },
  
    searchEmployee: async (req, res) => {
      try {
        const { letter } = req.params;
        const empData = await employeeSchema.find({
              role: "employee",
              $or: [
                { empName: { $regex: `^${letter}`, $options: "i" } },
                //{ empEmail: { $regex: `^${letter}`, $options: "i" } },
              ],
            }).select("empName empEmail empWorkingStatus");
        res.status(200).json({
          success: true,
          message: "Searched employees",
          empData: empData,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    },
  };