const empValSchema = require("./empValSchema")

module.exports = {
    registerEmployeeValidation: async(req,res,next)=>{
        const value = await empValSchema.registerEmployee.validate(req.body,{abortEarly:false})
        //when validating with abortEarly set to false, it only returns the first error it will encounter
        if(value.error){
            req.file ? unlinkSync(req.file.path) : null;
            res.status(403).json({
                success : false,
                message :value.error.details[0].message
             })
        }else{
            
            next()
        }
     },

     loginEmployeeValidation: async(req,res,next)=>{
        const value = await empValSchema.loginEmployee.validate(req.body,{abortEarly:false})
        //when validating with abortEarly set to false, it only returns the first error it will encounter
        if(value.error){
            req.file ? unlinkSync(req.file.path) : null;
            res.status(403).json({
                success : false,
                message :value.error.details[0].message
             })
        }else{
            
            next()
        }
     },

     resetPasswordValidation: async(req,res,next)=>{
        const value = await empValSchema.resetPassword.validate(req.body,{abortEarly:false})
        //when validating with abortEarly set to false, it only returns the first error it will encounter
        if(value.error){
            req.file ? unlinkSync(req.file.path) : null;
            res.status(403).json({
                success : false,
                message :value.error.details[0].message
             })
        }else{
            
            next()
        }
     },
    

    }