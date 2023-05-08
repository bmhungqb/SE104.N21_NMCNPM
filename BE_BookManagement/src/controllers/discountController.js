import discountService from '../services/discountService'

let handleGetAllDiscounts = async (req, res) => {
    let id = req.query.id // all,id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters",
            discounts: []
        })
    }
    let discounts = await discountService.getAllDiscounts(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        discounts
    })
}
let handleCreateNewDiscount = async (req, res) => {
    let message = await discountService.createNewDiscount(req.body);
    return res.status(200).json(message);
}

let handleEditDiscount = async (req, res) => {
    let data = req.body;
    let message = await discountService.updateDiscountData(data);
    return res.status(200).json(message)
}

let handleDeleteDiscount = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    let message = await discountService.deleteDiscount(req.body.id);
    return res.status(200).json(message);
}
module.exports = {
    handleGetAllDiscounts: handleGetAllDiscounts,
    handleCreateNewDiscount: handleCreateNewDiscount,
    handleEditDiscount: handleEditDiscount,
    handleDeleteDiscount: handleDeleteDiscount,
}