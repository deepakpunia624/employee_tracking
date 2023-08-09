const empNotificationSchema = require('../models/empNotificationSchema')
const empNotificationLogger = require('../utils/empNotificationLogger')

module.exports = {
    //.......notification API......
    createNotification: async (req, res) => {
        const empId = req.params.id;
        const notificationData = new empNotificationSchema(req.body)
        try {
            notificationData.empId = empId;
            await notificationData.save();
            empNotificationLogger.log('info', "Notification successfull")
            res.status(201).json({
                success: true,
                message: "Notification successfull",
                notification: notificationData,
            });
        }
        catch (error) {
            empNotificationLogger.log('error', error.message)
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}