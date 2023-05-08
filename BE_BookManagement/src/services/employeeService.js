import employee from "../models/employee";
import db from "../models/index";
let getAllEmployees = (employeeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let employees = ''
            if (employeeId === 'ALL') {
                employees = await db.Employee.findAll({
                    attributes: {
                    }
                })
            }
            if (employeeId && employeeId !== 'ALL') {
                employees = await db.Employee.findOne({
                    where: { id: employeeId },
                    attributes: {
                    }
                })
            }
            resolve(employees)
        } catch (e) {
            reject(e)
        }
    })
}
let createNewEmployee = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // let check = await checkUserEmail(data.email)
            if (false) {
                resolve({
                    errCode: 1,
                    errMessage: "Your email already in used, plz try another email"
                })
            } else {
                await db.Employee.create({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    gender: data.gender,
                    role: data.role,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    birthday: data.birthday,
                    userName: data.userName,
                    password: data.password,
                    startWork: data.startWork,
                    address: data.address,
                    image: data.image,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateEmployeeData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.firstName || !data.lastName
                || !data.gender || !data.role || !data.phoneNumber
                || !data.email || !data.birthday
                || !data.userName || !data.password || !data.startWork
                || !data.address || !data.image
            ) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameters"
                })
            }
            let employee = await db.Employee.findOne({
                where: { id: data.id },
                raw: false
            })
            if (employee) {
                employee.firstName = data.firstName;
                employee.lastName = data.lastName;
                employee.gender = data.gender;
                employee.role = data.role;
                employee.phoneNumber = data.phoneNumber;
                employee.email = data.email;
                employee.birthday = data.birthday;
                employee.userName = data.userName;
                employee.password = data.password;
                employee.startWork = data.startWork;
                employee.address = data.address;
                employee.image = data.image;
                employee.updatedAt = new Date();
                await employee.save()
                resolve({
                    errCode: 0,
                    message: 'Update the book succeeds! '
                });
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: "Book not found!"
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}
let deleteEmployee = (employeeId) => {
    return new Promise(async (resolve, reject) => {
        let employee = await db.Employee.findOne({
            where: { id: employeeId }
        })
        if (!employee) {
            resolve({
                errCode: 2,
                errMessage: "The employee isn't exist"
            })
        }
        await db.Employee.destroy({
            where: { id: employeeId }
        })
        resolve({
            errCode: 0,
            message: 'The book is deleted'
        })
    })
}

module.exports = {
    getAllEmployees: getAllEmployees,
    createNewEmployee: createNewEmployee,
    updateEmployeeData: updateEmployeeData,
    deleteEmployee: deleteEmployee,
}