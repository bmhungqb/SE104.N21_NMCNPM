import axios from '../axios'

const createNewEmployeeService = (dataEmployee) => {
    return axios.post('api/create-new-employee', dataEmployee)
}
const getAllEmployees = (inputId) => {
    return axios.get(`./api/get-all-employees?id=${inputId}`)
}

const editEmployeeService = (employeeEdit) => {
    return axios.put('./api/edit-employee', employeeEdit)
}
const deleteEmployeeService = (employeeId) => {
    return axios.delete('./api/delete-employee', {
        data: {
            id: employeeId
        }
    })
}
export {
    createNewEmployeeService,
    getAllEmployees,
    editEmployeeService,
    deleteEmployeeService
}