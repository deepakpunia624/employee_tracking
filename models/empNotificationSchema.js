const mongoose = require("mongoose")

const empNotificationSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    message : {
        type : String,
        required : true,
    },
    empId : {
        type : mongoose.Types.ObjectId,ref:"employee",
        required : true,
    },
    isActive : {
        type : String,
        default : true,
    },
    
})
empNotificationSchema.set('timestamps',true)
module.exports = mongoose.model('notification',empNotificationSchema)