import axios from '../axios'
const getAllRentsService = (id) => {
    return axios.get(`./api/get-all-rents?id=${id}`)
}
const CreateRentSevice = (dataRent) => {
    return axios.post('./api/create-new-rent', dataRent)
}
const CreateRentDetailService = (dataRentDetail) => {
    return axios.post('./api/create-new-rentDetail', dataRentDetail)
}
export {
    getAllRentsService,
    CreateRentSevice,
    CreateRentDetailService,
}