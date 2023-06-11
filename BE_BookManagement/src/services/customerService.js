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
            const existingCustomer = await db.Customer.findOne({ where: { phoneNumber: data.phoneNumber } })
            if (existingCustomer) {
                resolve({
                    errCode: 1,
                    errMessage: "This phone number already exists.",
                })
            }
            else {
                await db.Customer.create({
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
            }
            const [result] = await db.sequelize.query('SELECT LAST_INSERT_ID() as customerId');
            const customerId = result[0].customerId;
            resolve({
                errCode: 0,
                errMessage: "Create a new customer success.",
                newCustomerId: customerId
            })
        } catch (e) {
            resolve({
                errCode: 1,
                errMessage: "Creating a new customer has failed.",
            })
            reject(e);
        }
    })
}

let updateCustomerData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.customerId || !data.phoneNumber
                || !data.address || !data.email
                || !data.sex || !data.fullName
                || !data.rank) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters."
                })
            }
            let customer = await db.Customer.findOne({
                where: { customerId: data.customerId },
                raw: false
            })
            if (customer) {
                customer.fullName = data.fullName;
                customer.sex = data.sex;
                customer.rank = data.rank;
                customer.phoneNumber = data.phoneNumber;
                customer.address = data.address;
                customer.email = data.email;
                customer.updatedAt = new Date();
                await customer.save()
                resolve({
                    errCode: 0,
                    errMessage: "Updating the customer success.",
                });
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: "Customer not found!"
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
                errCode: 1,
                errMessage: "The customer doesn't exist."
            })
        }
        await db.Customer.destroy({
            where: { customerId: customerId }
        })
        resolve({
            errCode: 0,
            errMessage: 'The customer has been deleted.'
        })
    })
}

module.exports = {
    getAllCustomers: getAllCustomers,
    createNewCustomer: createNewCustomer,
    updateCustomerData: updateCustomerData,
    deleteCustomer: deleteCustomer,
}