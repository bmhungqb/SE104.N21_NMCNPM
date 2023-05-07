import customerService from '../services/customerService'

let handleGetAllCustomers = async (req, res) => {
    let id = req.query.id // all,id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters",
            customers: []
        })
    }
    let customers = await customerService.getAllCustomers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        customers
    })
}
let handleCreateNewCustomer = async (req, res) => {
    let message = await customerService.createNewCustomer(req.body);
    return res.status(200).json(message);
}

let handleEditCustomer = async (req, res) => {
    let data = req.body;
    let message = await customerService.updateCustomerData(data);
    return res.status(200).json(message)
}

let handleDeleteCustomer = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    let message = await customerService.deleteCustomer(req.body.id);
    return res.status(200).json(message);
}
module.exports = {
    handleGetAllCustomers: handleGetAllCustomers,
    handleCreateNewCustomer: handleCreateNewCustomer,
    handleEditCustomer: handleEditCustomer,
    handleDeleteCustomer: handleDeleteCustomer,
}