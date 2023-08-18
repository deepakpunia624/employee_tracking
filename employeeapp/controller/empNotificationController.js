const empNotificationSchema = require("../../models/empNotificationSchema");
const empNotificationLogger = require("../../utils/empNotificationLogger");

module.exports = {
  //.......notification API......
  showNotification: async (req, res) => {
    try {
        const { startDate, endDate } = req.query; // ! to use query we use ? it stands for giving query
        const notificationData = await empNotificationSchema.find({
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
        }).select('title message createdAt');
        if (notificationData.length === 0) {
          empNotificationLogger.log('error', "Notifications not found.");
            res.status(404).send({
                success: false,
                message: "Notifications not found."
            });
        } else {
          empNotificationLogger.log('info', "Notifications found.");
            res.status(200).send({
                success: true,
                message: "Notifications for you.",
                data: notificationData
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error!!",
            error: error.message
        });
    }
}
};
