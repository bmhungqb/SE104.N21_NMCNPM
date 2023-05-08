import supplier from "../models/supplier";
import db from "../models/index";
let getAllSuppliers = (supplierId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let suppliers = ''
            if (supplierId === 'ALL') {
                suppliers = await db.Supplier.findAll({
                    attributes: {
                    }
                })
            }
            if (supplierId && supplierId !== 'ALL') {
                suppliers = await db.Supplier.findOne({
                    where: { id: supplierId },
                    attributes: {
                    }
                })
            }
            resolve(suppliers)
        } catch (e) {
            reject(e)
        }
    })
}
let createNewSupplier = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // let check = await checkUserEmail(data.email)
            if (false) {
                resolve({
                    errCode: 1,
                    errMessage: "Your email already in used, plz try another email"
                })
            } else {
                await db.Supplier.create({
                    name: data.name,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    address: data.address,
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

let updateSupplierData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.name || !data.phoneNumber
                || !data.email || !data.address
            ) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameters"
                })
            }
            let supplier = await db.Supplier.findOne({
                where: { id: data.id },
                raw: false
            })
            if (supplier) {
                supplier.name = data.name;
                supplier.phoneNumber = data.phoneNumber;
                supplier.email = data.email;
                supplier.address = data.address;
                supplier.updatedAt = new Date();
                await supplier.save()
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
let deleteSupplier = (supplierId) => {
    return new Promise(async (resolve, reject) => {
        let supplier = await db.Supplier.findOne({
            where: { id: supplierId }
        })
        if (!supplier) {
            resolve({
                errCode: 2,
                errMessage: "The supplier isn't exist"
            })
        }
        await db.Supplier.destroy({
            where: { id: supplierId }
        })
        resolve({
            errCode: 0,
            message: 'The book is deleted'
        })
    })
}

module.exports = {
    getAllSuppliers: getAllSuppliers,
    createNewSupplier: createNewSupplier,
    updateSupplierData: updateSupplierData,
    deleteSupplier: deleteSupplier,
}