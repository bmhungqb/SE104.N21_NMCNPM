import userService from '../services/userService'
import requireAuth from '../middlewares/roleMiddleware'
var jwt = require('jsonwebtoken');
let handleLogin = async (req,res) => {
    const {username,password} = req.body
    console.log(username,password)
    if (!username || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing input parameter !"
        })
    }
    let userData = await userService.handleUserLogin(username, password)
    let token = jwt.sign(userData,"secret",{expiresIn:3*24*60*60})
    var maxAge=3*24*60*60
    res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData.user ? userData : {}
    })
}
let handleSignup = async (req,res) => {
    let message =await userService.createUser(req.body);
    res.status(201).json(message)
}


module.exports = {
    handleLogin: handleLogin,
    handleSignup: handleSignup
}