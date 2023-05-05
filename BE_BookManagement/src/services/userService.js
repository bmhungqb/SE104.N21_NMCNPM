import db from "../models/index"
import bcrypt from "bcryptjs"

const salt = bcrypt.genSaltSync(10);
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt)
            resolve(hashPassword)
        }
        catch (e) {
            console.log(e);
            reject(e);
        }
    })
}

let checkUsername = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { username: username }
            })
            if (user) {
                resolve(true)
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
            let isExists = await checkUsername(username)
            if (isExists) {
                // User already exists
                let user = await db.User.findOne({
                    where: { username: username },
                    attributes: ['username', 'password'],
                    raw: true
                })
                if (user) {
                    // compare password use bcrypt
                    let check = 1 //await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0
                        userData.errMessage = "Login success";
                        delete user.password
                        userData.user = user
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password!";
                    }
                }
                else {
                    userData.errCode = 2;
                    userData.errMessage = "User is not found!";
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

module.exports = {
    handleUserLogin: handleUserLogin,

}