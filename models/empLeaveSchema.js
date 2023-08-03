const mongoose = require("mongoose")

const empLeaveSchema = new mongoose.Schema({
    totalLeave : {
        type : String,
        required : true,
    },
    casualLeave : {
        type : String,
        required : true,
    },
    sickLeave : {
        type : String,
        required : true,
    },
    leavetype : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        required : true,
    },
    message : {
        type : String,
        required : true,
    },
    isActive : {
        type : String,
        required : true,
    },
    
})
empLeaveSchema.set('timestamps',true)
module.exports = mongoose.model('empLeave',empLeaveSchema)