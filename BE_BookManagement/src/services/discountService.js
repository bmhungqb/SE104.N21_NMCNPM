import discount from "../models/discount";
import db from "../models/index";
let getAllDiscounts = (discountId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let discounts = ''
            if (discountId === 'ALL') {
                discounts = await db.Discount.findAll({
                    attributes: {
                    }
                })
            }
            if (discountId && discountId !== 'ALL') {
                discounts = await db.Discount.findOne({
                    where: { id: discountId },
                    attributes: {
                    }
                })
            }
            resolve(discounts)
        } catch (e) {
            reject(e)
        }
    })
}
let createNewDiscount = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // let check = await checkUserEmail(data.email)
            if (false) {
                resolve({
                    errCode: 1,
                    errMessage: "Your email already in used, plz try another email"
                })
            } else {
                await db.Discount.create({
                    state: data.state,
                    name: data.name,
                    start: data.start,
                    end: data.end,
                    percentage: data.percentage,
                    quantity: data.quantity,
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

let updateDiscountData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.name || !data.state
                || !data.start || !data.end || !data.percentage
                || !data.quantity
            ) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameters"
                })
            }
            let discount = await db.Discount.findOne({
                where: { id: data.id },
                raw: false
            })
            if (discount) {
                discount.state = data.state;
                discount.name = data.name;
                discount.percentage = data.percentage;
                discount.start = data.start;
                discount.end = data.end;
                discount.quantity = data.quantity;
                discount.updatedAt = new Date();
                await discount.save()
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
let deleteDiscount = (discountId) => {
    return new Promise(async (resolve, reject) => {
        let discount = await db.Discount.findOne({
            where: { id: discountId }
        })
        if (!discount) {
            resolve({
                errCode: 2,
                errMessage: "The discount isn't exist"
            })
        }
        await db.Discount.destroy({
            where: { id: discountId }
        })
        resolve({
            errCode: 0,
            message: 'The book is deleted'
        })
    })
}

module.exports = {
    getAllDiscounts: getAllDiscounts,
    createNewDiscount: createNewDiscount,
    updateDiscountData: updateDiscountData,
    deleteDiscount: deleteDiscount,
}