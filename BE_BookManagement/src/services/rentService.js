import db from "../models/index"
let getAllRent = async () => {
    try {
        let rents = await db.Rent.findAll({
            include: [
                {
                    model: db.Customer,
                    attributes: ['fullName'],
                },
                {
                    model: db.Book,
                    attributes: ['bookTitle'],
                },
            ], attributes: ['id', 'bookId', 'customerId', 'quantity']
        });
        return rents
    } catch (e) {
        return e
    }
}
let updateRentData = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.bookId || !data.customerId
                || !data.quantity
            ) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameters"
                })
            }
            let rent = await db.Rent.findOne({
                where: { id: data.id },
                raw: false
            })
            if (rent) {
                // Cái này dính dàng tới khóa ngoại nên chỉ đổi quantity
                // rent.bookId = data.bookId;
                // rent.customerId = data.customerId;
                rent.quantity = data.quantity;
                rent.updatedAt = new Date();
                await rent.save()
                resolve({
                    errCode: 0,
                    message: 'Update the rent succeeds! '
                });
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: "Rent not found!"
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}
let deleteRentData = async (data) => {
    return new Promise(async (resolve, reject) => {
        console.log(data.id)
        const rent = await db.Rent.findOne({ where: { id: data.id } })
        if (rent) {
            console.log(rent)
            const destroy = await db.Rent.destroy({ where: { id: data.id } })
            console.log("destroy ne ", destroy)
            resolve(destroy)
        } else {
            resolve(rent)
        }
    })
}
async function PriceEachRentDetailId(id) {
    const rent = await db.Rent.findOne({ where: { rentId: id } })
    const rentDetails = await db.RentDetail.findAll({ include: [{ model: db.Book }] })
    let totalPrice = 0;
    rentDetails.forEach((rentDetail) => {
        if (rentDetail.rentDetailId == id) {
            totalPrice += (rentDetail.Books[0].sellingPrice * rentDetail.quantity * rent.dayRent * 1.5 / 100);
        }
    })
    rent.rentPrice = totalPrice;
    await rent.save();
}

module.exports = {
    getAllRent: getAllRent,
    updateRentData: updateRentData,
    deleteRentData: deleteRentData,
    PriceEachRentDetailId: PriceEachRentDetailId,
}