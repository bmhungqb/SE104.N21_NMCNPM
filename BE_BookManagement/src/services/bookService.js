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
                console.log(data)
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

module.exports = {
    createNewBook: createNewBook,
    getAllBooks: getAllBooks
}