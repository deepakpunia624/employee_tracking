let express = require("express");
let notification = require('../controller/notificationController')

let notificationRouter = express.Router();

notificationRouter.post("/create/:id", notification.createNotification);
notificationRouter.patch("/update/:id", notification.updateNotification);
notificationRouter.delete("/delete/:id", notification.deleteNotification);


module.exports = notificationRouter;