import db from "../models/index"
import bcrypt from "bcryptjs"

let hashUserPassword = async (password) => {
    try {
            const salt = bcrypt.genSaltSync(10);
            let hashPassword = await bcrypt.hashSync(password, salt)
            return hashPassword
        }
        catch (e) {
            console.log(e);
            throw Error(e)
        }
}

let checkUsername = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { username: username }
            })
            if (user) {
                resolve(user)
            }
            else {
                resolve(false)
            }
        }
        catch (e) {
            console.log(e);
            reject(e);
        }
    })
}
let handleUserLogin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let users = await checkUsername(username)
            if (users) {
                // User already exists
                let auth = await bcrypt.compare(password,users.password)
                if (auth) {

                        userData.errCode = 0
                        userData.errMessage = "Login success";
                        userData.user = users
                }
                else {
                    userData.errCode = 3;
                    userData.errMessage = "Wrong password!";
                }
            }
            else {
                // return Error
                userData.errCode = 1;
                userData.errMessage = `Your username isn's exists in our system. Please try again!`;
            }
            resolve(userData);
        }
        catch (e) {
            console.log(e);
            reject(e);
        }
    })
}
let createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        let password =await hashUserPassword(data.password)
        try {
                await db.User.create({
                    username: data.username,
                    password: password,
                    roleId: data.roleId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                resolve({
                    errCode: 0,
                    message: 'OK'
                })        
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    createUser:createUser
}