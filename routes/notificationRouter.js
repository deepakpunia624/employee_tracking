const express = require('express')

const notification = require('../controller/empNotificationController');

const notificationRouter = express.Router()

notificationRouter.post("/create/:id", notification.createNotification)

module.exports = notificationRouter