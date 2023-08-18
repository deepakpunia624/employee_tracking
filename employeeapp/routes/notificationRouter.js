const express = require("express");

const notification = require("../controller/empNotificationController");

const notificationRouter = express.Router();

notificationRouter.get("/showNotification", notification.showNotification);

module.exports = notificationRouter;
