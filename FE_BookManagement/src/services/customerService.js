import axios from '../axios'

const createNewCustomerService = (dataCustomer) => {
    return axios.post('api/create-new-customer', dataCustomer)
}
const getAllCustomers = (inputId) => {
    return axios.get(`./api/get-all-customers?id=${inputId}`)
}

const editCustomerService = (customerEdit) => {
    return axios.put('./api/edit-customer', customerEdit)
}
const deleteCustomerService = (customerId) => {
    return axios.delete('./api/delete-customer', {
        data: {
            id: customerId
        }
    })
}
export {
    createNewCustomerService,
    getAllCustomers,
    editCustomerService,
    deleteCustomerService
}