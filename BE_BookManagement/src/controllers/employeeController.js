import employeeService from '../services/employeeService'

let handleGetAllEmployees = async (req, res) => {
    let id = req.query.id // all,id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters",
            employees: []
        })
    }
    let employees = await employeeService.getAllEmployees(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        employees
    })
}
let handleCreateNewEmployee = async (req, res) => {
    let message = await employeeService.createNewEmployee(req.body);
    return res.status(200).json(message);
}

let handleEditEmployee = async (req, res) => {
    let data = req.body;
    let message = await employeeService.updateEmployeeData(data);
    return res.status(200).json(message)
}

let handleDeleteEmployee = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    let message = await employeeService.deleteEmployee(req.body.id);
    return res.status(200).json(message);
}
module.exports = {
    handleGetAllEmployees: handleGetAllEmployees,
    handleCreateNewEmployee: handleCreateNewEmployee,
    handleEditEmployee: handleEditEmployee,
    handleDeleteEmployee: handleDeleteEmployee,
}