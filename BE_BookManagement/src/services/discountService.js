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
                    where: { discountId: discountId },
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
            await db.Discount.create({
                discountId: data.discountId,
                state: data.state,
                name: data.name,
                start: data.start,
                end: data.end,
                percentage: data.percentage,
                state: data.state,
                customerRank: data.customerRank,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            resolve({
                errCode: 0,
                errMessage: "Create a new discount success.",
            })
        } catch (e) {
            resolve({
                errCode: 1,
                errMessage: "Creating a new discount has failed.",
            })
            reject(e);
        }
    })
}

let updateDiscountData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.discountId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters"
                })
            }
            let discount = await db.Discount.findOne({
                where: { discountId: data.discountId },
                raw: false
            })
            if (discount) {
                discount.state = data.state;
                discount.name = data.name;
                discount.percentage = data.percentage;
                discount.start = data.start;
                discount.end = data.end;
                discount.updatedAt = new Date();
                await discount.save()
                resolve({
                    errCode: 0,
                    errMessage: 'Updating the discount success.'
                });
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: "Discount not found!"
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
            where: { discountId: discountId }
        })
        if (!discount) {
            resolve({
                errCode: 1,
                errMessage: "The discount doesn't exist."
            })
        }
        await db.Discount.destroy({
            where: { discountId: discountId }
        })
        resolve({
            errCode: 0,
            errMessage: 'The discount has been deleted.'
        })
    })
}

module.exports = {
    getAllDiscounts: getAllDiscounts,
    createNewDiscount: createNewDiscount,
    updateDiscountData: updateDiscountData,
    deleteDiscount: deleteDiscount,
}