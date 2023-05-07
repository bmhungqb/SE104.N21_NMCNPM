import axios from '../axios'

const createNewBookService = (dataBook) => {
    return axios.post('api/create-new-book', dataBook)
}
const getAllBooks = (inputId) => {
    return axios.get(`./api/get-all-books?id=${inputId}`)
}

const editBookService = (bookEdit) => {
    return axios.put('./api/edit-book', bookEdit)
}
const deleteBookService = (bookId) => {
    return axios.delete('./api/delete-book', {
        data: {
            id: bookId
        }
    })
}
export {
    createNewBookService,
    getAllBooks,
    editBookService,
    deleteBookService
}