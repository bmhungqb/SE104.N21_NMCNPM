import supplierService from '../services/supplierService'

let handleGetAllSuppliers = async (req, res) => {
    let id = req.query.id // all,id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters",
            suppliers: []
        })
    }
    let suppliers = await supplierService.getAllSuppliers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        suppliers
    })
}
let handleCreateNewSupplier = async (req, res) => {
    let message = await supplierService.createNewSupplier(req.body);
    return res.status(200).json(message);
}

let handleEditSupplier = async (req, res) => {
    let data = req.body;
    let message = await supplierService.updateSupplierData(data);
    return res.status(200).json(message)
}

let handleDeleteSupplier = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    let message = await supplierService.deleteSupplier(req.body.id);
    return res.status(200).json(message);
}
module.exports = {
    handleGetAllSuppliers: handleGetAllSuppliers,
    handleCreateNewSupplier: handleCreateNewSupplier,
    handleEditSupplier: handleEditSupplier,
    handleDeleteSupplier: handleDeleteSupplier,
}