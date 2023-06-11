import bookService from '../services/bookService'

let handleGetAllBooks = async (req, res) => {
    let id = req.query.id // all,id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters",
            books: []
        })
    }
    let books = await bookService.getAllBooks(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: "OK",
        books
    })
}
let handleCreateNewBook = async (req, res) => {
    try {
        let message = await bookService.createNewBook(req.body);
        return res.status(200).json(message);
    } catch (e) {
        return res.status(500).json({
            errCode: 1,
            errMessage: e.message
        });
    }
}

let handleEditBook = async (req, res) => {
    try {
        let data = req.body;
        let message = await bookService.updateBookData(data);
        return res.status(200).json(message)
    } catch (e) {
        return res.status(500).json({
            errCode: 1,
            errMessage: e.message
        });
    }
}

let handleDeleteBook = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    let message = await bookService.deleteBook(req.body.id);
    return res.status(200).json(message);
}
module.exports = {
    handleCreateNewBook: handleCreateNewBook,
    handleGetAllBooks: handleGetAllBooks,
    handleEditBook: handleEditBook,
    handleDeleteBook: handleDeleteBook,
}