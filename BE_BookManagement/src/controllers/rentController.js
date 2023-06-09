import db from "../models/index"
import { getAllRent, updateRent, deleteRentData, PriceEachRentDetailId } from "../services/rentService"

let GetAllRent = async (req, res) => {
    try {
        let rentId = req.query.id;
        if (!rentId) {
            return res.status(200).json({
                errCode: 1,
                errMessage: "Missing required parameters",
                customers: []
            })
        }
        else {
            if (rentId === "ALL") {
                const rents = await db.Rent.findAll(
                    {
                        include: [
                            {
                                model: db.Customer,
                                attributes: ['fullName'],
                            },
                            // {
                            //     model: db.Book,
                            //     attributes: ['bookTitle'],
                            // },
                        ],
                        // attributes: ['id', 'bookId', 'customerId', 'quantity']
                    });
                res.status(200).json({
                    errCode: 0,
                    rents: rents
                })
            }
            if (rentId && rentId !== 'ALL') {
                const rents = await db.Rent.findOne({
                    where: { rentId: rentId },
                    include: [
                        {
                            model: db.Customer,
                            attributes: ['fullName', "phoneNumber", "email", "address"],
                        },
                    ]
                })
                res.status(200).json({
                    errCode: 0,
                    rents: rents
                })
            }
        }
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
    // let rents = await getAllRent(req.query.id);
    // if (rents) {
    //     return res.status(200).json({
    //         errCode: 0,
    //         errMessage: "OK",
    //         rents: rents
    //     })
    // } else {
    //     return res.status(400).json({
    //         errCode: 1,
    //         errMessage: "Missing required parameters",
    //         rents: []
    //     })
    // }
}
let GetAllRentDetail = async (req, res) => {
    try {
        let rentDetailId = req.query.id;
        if (!rentDetailId) {
            return res.status(200).json({
                errCode: 1,
                errMessage: "Missing required parameters",
                customers: []
            })
        }
        else {
            if (rentDetailId === "ALL") {
                const rentsDetail = await db.RentDetail.findAll(
                    {
                        include: [{ model: db.Book }]
                    });
                res.status(200).json({
                    errCode: 0,
                    rentsDetail: rentsDetail
                })
            }
            if (rentDetailId && rentDetailId !== 'ALL') {
                const rentsDetail = await db.RentDetail.findAll({
                    where: { rentDetailId: rentDetailId },
                    include: [{ model: db.Book }]
                })
                res.status(200).json({
                    errCode: 0,
                    rentsDetail: rentsDetail
                })
            }
        }
    } catch (e) {
        res.status(400).json({ error: e.message })
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
    GetAllRentDetail: GetAllRentDetail,
    CreateRent: CreateRent,
    CreateRentDetail: CreateRentDetail,
    EditRent: EditRent,
    DeleteRent: DeleteRent
}