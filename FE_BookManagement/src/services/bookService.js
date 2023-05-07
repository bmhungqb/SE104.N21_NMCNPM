import axios from '../axios'

const createNewBookService = (data) => {
    return axios.post('api/create-new-book', data)
}
const getAllBooks = (inputId) => {
    return axios.get(`./api/get-all-books?id=${inputId}`)
}
export {
    createNewBookService,
    getAllBooks
}