import db from "../models/index"
import { getAllRent, updateRent, deleteRentData, PriceEachRentDetailId } from "../services/rentService"

let GetAllRent = async (req, res) => {
    let rents = await getAllRent();
    console.log(rents)
    if (rents) {
        return res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            rents
        })
    } else {
        return res.status(400).json({
            errCode: 1,
            errMessage: "Missing required parameters",
            rents: []
        })
    }
}

let CreateRent = async (req, res) => {
    try {
        if (Object.keys(req.body).length !== 0 && req.body !== null) {
            const rent = await db.Rent.create({
                customerId: req.body.customerId,
                dateReturn: req.body.dateReturn,
                dayRent: req.body.dayRent,

                rentPrice: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            if (rent) {
                rent.rentDetailId = rent.rentId;
                await rent.save()
                res.status(200).json({
                    errCode: 0,
                    errMessage: "OK",
                    rent: rent,
                    rentId: rent.rentId
                })
            } else {
                res.status(400).json({
                    errCode: 1,
                    errMessage: "Missing required parameters",
                    rent: []
                })
            }
        }
        else {
            throw Error("Missing required parameters")
        }
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
}
async function CreateRentDetail(req, res) {
    try {
        const rentDetail = await db.RentDetail.create({
            rentDetailId: req.body.rentDetailId,
            bookId: req.body.bookId,
            quantity: req.body.quantity,
        })
        await PriceEachRentDetailId(rentDetail.rentDetailId)
        res.status(200).json({ rentDetail: rentDetail });
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
}
let EditRent = async (req, res) => {
    const rent = await updateRentData(req.body);
    if (rent.errCode !== 0) {
        res.status(400).json(rent)
    } else {
        res.status(200).json(rent)
    }
}
let DeleteRent = async (req, res) => {
    const rent = await deleteRentData(req.body)
    if (rent) {
        res.status(200).json({
            errCode: 0,
            message: 'Delete the rent succeed!'
        })
    }
    else {
        res.status(200).json({
            errCode: 1,
            errMessage: "This rent is not exist"
        })
    }

}
module.exports = {
    GetAllRent: GetAllRent,
    CreateRent: CreateRent,
    CreateRentDetail: CreateRentDetail,
    EditRent: EditRent,
    DeleteRent: DeleteRent
}