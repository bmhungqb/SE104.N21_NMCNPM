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
                    where: { bookId: bookId },
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
// let createNewBook = async (data) => {
//     const t = await db.sequelize.transaction();
//     return new Promise(async (resolve, reject) => {
//         try {
//             const bookRegulation = await db.Regulation.findOne({
//                 logging: false,
//                 where: { regulationId: 1 }
//             }
//             )
//             // Regulation 1
//             if (bookRegulation && (data.stock < bookRegulation.minimumInput || data.stock > bookRegulation.minimumStock)) {
//                 resolve({
//                     errCode: 0,
//                     errMessage: "You cannot exceed the number of regulations."
//                 })
//             } else {
//                 const beginningStock = data.stock
//                 await UpdateBeginningStock(data, t, beginningStock)
//                 const book = await db.Book.create({
//                     // bookId: data.bookId,
//                     bookTitle: data.bookTitle,
//                     genre: data.genre,
//                     authorName: data.author,
//                     costPrice: data.costPrice,
//                     sellingPrice: data.costPrice * 105 / 100,
//                     stock: data.stock,
//                     createdAt: new Date(),
//                     updatedAt: new Date()
//                 }, { transaction: t })
//                 await t.commit();
//                 resolve({
//                     errCode: 0,
//                     errMessage: "Create a new book success.",
//                     book: book
//                 })
//             }
//         } catch (e) {
//             await t.rollback()
//             reject(e);
//         }
//     })
// }
let createNewBook = async (data) => {
    const t = await db.sequelize.transaction();
    return new Promise(async (resolve, reject) => {
        try {
            const bookRegulation = await db.Regulation.findOne({
                logging: false,
                where: { regulationId: 1 }
            }
            )
            // Regulation 1
            if (bookRegulation && (data.stock < bookRegulation.minimumInput || data.stock > bookRegulation.minimumStock)) {
                resolve({
                    errCode: 0,
                    errMessage: `you cannot add less than ${bookRegulation.minimumInput} and add more than ${bookRegulation.minimumStock}  book`
                })
            } else {
                const beginningStock = data.stock
                const book = await db.Book.create({
                    // bookId: data.bookId,
                    bookTitle: data.bookTitle,
                    genre: data.genre,
                    authorName: data.author,
                    costPrice: data.costPrice,
                    sellingPrice: data.costPrice * 105 / 100,
                    stock: data.stock,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }, { transaction: t })
                await t.commit();
                const bookId = await db.Book.findOne({ where: { bookTitle: data.bookTitle } }, { attributes: ['bookId'] })
                await UpdateBeginningStock(bookId, beginningStock)
                resolve({
                    errCode: 0,
                    errMessage: "Create a new book success.",
                    book: book
                })
            }
        } catch (e) {
            await t.rollback()
            reject(e);
        }
    })
}


let updateBookData = async (data) => {
    const t = await db.sequelize.transaction()
    return new Promise(async (resolve, reject) => {
        try {
            const bookRegulation = await db.Regulation.findOne({ where: { regulationId: 1 } })
            if (!data.bookId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters"
                })
            }
            let book = await db.Book.findOne({
                where: { bookId: data.bookId },
                raw: false
            })
            if (book) {
                // regulation 1
                if (bookRegulation && data.stock < bookRegulation.minimumInput && data.stock > bookRegulation.minimumStock) {
                    resolve({
                        errCode: 1,
                        message: "you cannot excess the number of book regulation "
                    });
                } else {
                    const beginningStock = data.stock - book.stock
                    await UpdateBeginningStock(data, t, beginningStock)
                    book.bookTitle = data.bookTitle;
                    book.genre = data.genre;
                    book.authorName = data.author;
                    book.costPrice = data.costPrice;
                    book.stock = data.stock;
                    book.updatedAt = new Date();
                    await book.save()
                    await t.commit()
                    resolve({
                        errCode: 0,
                        message: 'Update the book succeeds! '
                    });
                }
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: "Book not found!"
                });
            }
        } catch (e) {
            await t.rollback();
            reject(e)
        }
    })
}
let deleteBook = (bookId) => {
    return new Promise(async (resolve, reject) => {
        let book = await db.Book.findOne({
            where: { bookId: bookId }
        })
        if (!book) {
            resolve({
                errCode: 1,
                errMessage: "The book isn't exist"
            })
        }
        await db.Book.destroy({
            where: { bookId: bookId }
        })
        resolve({
            errCode: 0,
            message: 'The book is deleted'
        })
    })
}
// async function UpdateBeginningStock(data, t, beginningStock) {
//     // console.log(beginningStock)
//     const bookReport = await db.BookReport.create({
//         bookId: data.bookId,
//         date: data.createdAt,
//         beginningStock: beginningStock,
//         endingStock: 0,
//         phatSinh: 0
//     }, { transaction: t })
// }
async function UpdateBeginningStock(data, beginningStock) {
    // console.log(beginningStock)
    const bookReport = await db.BookReport.create({
        bookId: data.bookId,
        date: data.createdAt,
        beginningStock: beginningStock,
        endingStock: 0,
        phatSinh: 0
    })

}
module.exports = {
    createNewBook: createNewBook,
    getAllBooks: getAllBooks,
    updateBookData: updateBookData,
    deleteBook: deleteBook,
    UpdateBeginningStock: UpdateBeginningStock,
}