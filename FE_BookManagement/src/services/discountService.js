import axios from '../axios'

const createNewDiscountService = (dataDiscount) => {
    return axios.post('api/create-new-discount', dataDiscount)
}
const getAllDiscounts = (inputId) => {
    return axios.get(`./api/get-all-discounts?id=${inputId}`)
}

const editDiscountService = (discountEdit) => {
    return axios.put('./api/edit-discount', discountEdit)
}
const deleteDiscountService = (discountId) => {
    return axios.delete('./api/delete-discount', {
        data: {
            id: discountId
        }
    })
}
export {
    createNewDiscountService,
    getAllDiscounts,
    editDiscountService,
    deleteDiscountService
}