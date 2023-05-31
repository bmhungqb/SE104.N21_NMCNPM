import db from "../models/index"
var jwt = require('jsonwebtoken');
function isAdmin(req,res,next){
    const token = req.cookies.jwt
    console.log(token)
    if (token){
        jwt.verify(token,'secret',(err,decodedToken)=>{
            if (err){
                console.log(err.message)
                res.status(401).json({message:"you are not autherized"})
            } else {
                if(decodedToken.user.roleId==1){
                    next();
                }
                else{
                    res.status(401).json({message:"you are not autherized"})
                }
            }
        })
    } else {
        res.status(401).json({message:"you are not autherized"})
    }
}
module.exports = isAdmin