import customer from "../models/customer";
import db from "../models/index";
let getAllCustomers = (customerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let customers = ''
            if (customerId === 'ALL') {
                customers = await db.Customer.findAll({
                    attributes: {
                    }
                })
            }
            if (customerId && customerId !== 'ALL') {
                customers = await db.Customer.findOne({
                    where: { customerId: customerId },
                    attributes: {
                    }
                })
            }
            resolve(customers)
        } catch (e) {
            reject(e)
        }
    })
}
let createNewCustomer = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // let check = await checkUserEmail(data.email)
            if (false) {
                resolve({
                    errCode: 1,
                    errMessage: "Your email already in used, plz try another email"
                })
            } else {
                await db.Customer.create({
                    customerId: data.customerId,
                    fullName: data.fullName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    sex: data.sex,
                    dept: 0,
                    rank: data.rank,
                    totalPurchaseValue: 0,
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

let updateCustomerData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.firstName || !data.lastName
                || !data.customerState || !data.sex || !data.phoneNumber
                || !data.address || !data.email
            ) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameters"
                })
            }
            let customer = await db.Customer.findOne({
                where: { id: data.id },
                raw: false
            })
            if (customer) {
                customer.firstName = data.firstName;
                customer.lastName = data.lastName;
                customer.customerState = data.customerState;
                customer.sex = data.sex;
                customer.phoneNumber = data.phoneNumber;
                customer.address = data.address;
                customer.email = data.email;
                customer.updatedAt = new Date();
                await customer.save()
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
let deleteCustomer = (customerId) => {
    return new Promise(async (resolve, reject) => {
        let customer = await db.Customer.findOne({
            where: { customerId: customerId }
        })
        if (!customer) {
            resolve({
                errCode: 2,
                errMessage: "The customer isn't exist"
            })
        }
        await db.Customer.destroy({
            where: { customerId: customerId }
        })
        resolve({
            errCode: 0,
            message: 'The book is deleted'
        })
    })
}

module.exports = {
    getAllCustomers: getAllCustomers,
    createNewCustomer: createNewCustomer,
    updateCustomerData: updateCustomerData,
    deleteCustomer: deleteCustomer,
}