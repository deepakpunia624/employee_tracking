module.exports={
    isEmployee(req,res,next){
        if(req.body.role == "employee"){
            next()
        }else{
            res.status(401).json({
                success : false,
                message : "not auth",
        
            })
        }
    }
}