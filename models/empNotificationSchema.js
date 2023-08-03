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
    emp_id : {
        type : mongoose.Types.ObjectId,ref:"employee",
        required : true,
    },
    isActive : {
        type : String,
        required : true,
    },
    
})
empNotificationSchema.set('timestamps',true)
module.exports = mongoose.model('notification',empNotificationSchema)