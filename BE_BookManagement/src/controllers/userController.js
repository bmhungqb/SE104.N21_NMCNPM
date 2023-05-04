import userService from '../services/userService'

let handleLogin = async (req, res) => {
    console.log(req.body);
    let username = req.body.username
    let password = req.body.password
    if (!username || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing input parameter !"
        })
    }
    let userData = await userService.handleUserLogin(username, password)
    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData.user ? userData : {}
    })
}

module.exports = {
    handleLogin: handleLogin,
}