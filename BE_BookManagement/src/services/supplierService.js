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
            if (!data.name || !data.phoneNumber
                || !data.email || !data.address) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters."
                })

            }
            else {
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
                    errMessage: "Create a new supplier success.",
                })
            }
        } catch (e) {
            resolve({
                errCode: 1,
                errMessage: "Creating a new supplier has failed.",
            })
            reject(e);
        }
    })
}

let updateSupplierData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.name || !data.phoneNumber
                || !data.email || !data.address) {
                resolve({
                    errCode: 1,
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
                    errMessage: "Updating the supplier success.",
                });
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: "Supplier not found!"
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
                errCode: 1,
                errMessage: "The supplier doesn't exist."
            })
        }
        await db.Supplier.destroy({
            where: { id: supplierId }
        })
        resolve({
            errCode: 0,
            errMessage: 'The supplier has been deleted.'
        })
    })
}

module.exports = {
    getAllSuppliers: getAllSuppliers,
    createNewSupplier: createNewSupplier,
    updateSupplierData: updateSupplierData,
    deleteSupplier: deleteSupplier,
}