let empNotificationSchema = require("../../models/empNotificationSchema")

//.......notification API......
module.exports={
createNotification: async (req, res) => {
    const empId = req.params.id;
    const notificationData = new empNotificationSchema(req.body);
    try {
      notificationData.empId = empId;
      await notificationData.save();
      res.status(201).json({
        success: true,
        message: "Notification send successfull",
        notification: notificationData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  updateNotification : async(req,res)=>{
    const Id = req.params.id;
    const notificationData = await empNotificationSchema.findByIdAndUpdate(Id,req.body,{ new: true });
    try {
      await notificationData.save();
      res.status(201).json({
        success: true,
        message: "Notification update successfull",
        notification: notificationData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  deleteNotification : async(req,res)=>{
    const Id = req.params.id;
    const notificationData = await empNotificationSchema.findByIdAndDelete(Id);
    try {
      res.status(201).json({
        success: true,
        message: "Notification delete successfull",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};
