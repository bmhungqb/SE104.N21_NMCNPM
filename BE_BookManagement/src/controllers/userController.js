import userService from '../services/userService'
import requireAuth from '../middlewares/roleMiddleware'
let handleLogin = async (req, res) => {
    const { username, password } = req.body
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
let handleSignup = async (req, res) => {
    let message = await userService.createUser(req.body);
    res.status(201).json(message)
}


let handleGetAllUsers = async (req, res) => {
    let id = req.query.id // all,id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters",
            users: []
        })
    }
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        users
    })
}
let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}
module.exports = {
    handleLogin: handleLogin,
    handleSignup: handleSignup,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,

}