import axios from '../axios'
const createNewSupplierService = (dataSupplier) => {
    return axios.post('api/create-new-supplier', dataSupplier)
}
const getAllSuppliers = (inputId) => {
    return axios.get(`./api/get-all-suppliers?id=${inputId}`)
}

const editSupplierService = (supplierEdit) => {
    return axios.put('./api/edit-supplier', supplierEdit)
}
const deleteSupplierService = (supplierId) => {
    return axios.delete('./api/delete-supplier', {
        data: {
            id: supplierId
        }
    })
}
export {
    createNewSupplierService,
    getAllSuppliers,
    editSupplierService,
    deleteSupplierService
}