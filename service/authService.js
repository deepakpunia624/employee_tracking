 const employeeSchema = require("../models/employeeSchema");
 const bcrypt = require("bcrypt")
 const jwt =require('jsonwebtoken');

module.exports = {
  isEmployee : async (empEmail) =>{
 let isEmployeeExist = await employeeSchema.findOne({
    empEmail : empEmail,

});
    if(isEmployeeExist){
        return true
}   
},

validateEmployee:async(empEmail,empPassword = 0)=>{
    let value = false;
     let token="";
     const empData =await employeeSchema.findOne({
         empEmail:empEmail,
     });
     if(empData){
         if(empPassword!=0){
             const hashPassword = await bcrypt.compare(
                 empPassword,
                 empData.empPassword
                );
                if(empData&&hashPassword){
                 token=await jwt.sign({empId: empData._id},process.env.SECRET_KEY,{expiresIn:"1h"})
                 value=true;
                }   
         }else{
             token=await jwt.sign({empId: empData._id},process.env.SECRET_KEY,{expiresIn:"1h"})
         
         };
        
     }

     return {value,token,empData};
 },

}

