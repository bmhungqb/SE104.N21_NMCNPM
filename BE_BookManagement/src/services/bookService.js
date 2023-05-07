import db from "../models/index";
let getAllBooks = (bookId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let books = ''
            if (bookId === 'ALL') {
                books = await db.Book.findAll({
                    attributes: {
                    }
                })
            }
            if (bookId && bookId !== 'ALL') {
                books = await db.Book.findOne({
                    where: { id: bookId },
                    attributes: {
                    }
                })
            }
            resolve(books)
        } catch (e) {
            reject(e)
        }
    })
}
let createNewBook = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // let check = await checkUserEmail(data.email)
            if (false) {
                resolve({
                    errCode: 1,
                    errMessage: "Your email already in used, plz try another email"
                })
            } else {
                await db.Book.create({
                    bookTitle: data.bookTitle,
                    genre: data.genre,
                    authorName: data.author,
                    publisherName: data.publisher,
                    costPrice: data.costPrice,
                    sellingPrice: data.sellingPrice,
                    quantity: data.quantity,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateBookData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.bookTitle || !data.genre
                || !data.author || !data.publisher || !data.costPrice
                || !data.sellingPrice || !data.quantity
            ) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameters"
                })
            }
            let book = await db.Book.findOne({
                where: { id: data.id },
                raw: false
            })
            if (book) {
                book.bookTitle = data.bookTitle;
                book.genre = data.genre;
                book.authorName = data.author;
                book.publisherName = data.publisher;
                book.costPrice = data.costPrice;
                book.sellingPrice = data.sellingPrice;
                book.quantity = data.quantity;
                book.updatedAt = new Date();
                await book.save()
                resolve({
                    errCode: 0,
                    message: 'Update the book succeeds! '
                });
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: "Book not found!"
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}
let deleteBook = (bookId) => {
    return new Promise(async (resolve, reject) => {
        let book = await db.Book.findOne({
            where: { id: bookId }
        })
        if (!book) {
            resolve({
                errCode: 2,
                errMessage: "The book isn't exist"
            })
        }
        await db.Book.destroy({
            where: { id: bookId }
        })
        resolve({
            errCode: 0,
            message: 'The book is deleted'
        })
    })
}

module.exports = {
    createNewBook: createNewBook,
    getAllBooks: getAllBooks,
    updateBookData: updateBookData,
    deleteBook: deleteBook,
}