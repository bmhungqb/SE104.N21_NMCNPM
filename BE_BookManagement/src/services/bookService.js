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
let createNewBook = async(data) => {
    const t = await db.sequelize.transaction();
    return new Promise(async (resolve, reject) => {
        try {
            // let check = await checkUserEmail(data.email)
            const bookRegulation =await db.Regulation.findOne({where:{regulationId:1}})
            if (false) {
                resolve({
                    errCode: 1,
                    errMessage: "Your email already in used, plz try another email"
                })
            } else {
                // Regulation 1
                if (data.stock <bookRegulation.minimumInput || data.stock>bookRegulation.minimumStock){
                    throw new Error("you cannot excess the number of regulation")
                } else{
                    const beginningStock=data.stock
                    UpdateBeginningStock(data,t,beginningStock)
                    const book =await db.Book.create({
                        bookId:data.bookId,
                        bookTitle: data.bookTitle,
                        genre: data.genre,
                        authorName: data.author,
                        costPrice: data.costPrice,
                        sellingPrice: data.costPrice*105/100,
                        stock: data.stock,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    },{transaction:t})
                    await t.commit();
                    resolve({
                        errCode: 0,
                        book: book
                    })
                }
            }
        } catch (e) {
            await t.rollback()
            reject(e);
        }
    })
}

let updateBookData = async(data) => {
    const t = await db.sequelize.transaction()
    return new Promise(async (resolve, reject) => {
        try {
            const bookRegulation = db.Regulation.findOne({where:{regulationId:1}})
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
                where: { bookId: data.bookId },
                raw: false
            })
            if (book) {
                // regulation 1
                if (data.stock <bookRegulation.minimumInput && data.stock>bookRegulation.minimumStock){
                    throw Error("you cannot excess the number of book regulation ")
                } else {
                    const beginningStock = data.stock-book.stock
                    UpdateBeginningStock(data,t,beginningStock)
                    book.bookTitle = data.bookTitle;
                    book.genre = data.genre;
                    book.authorName = data.author;
                    book.publisherName = data.publisher;
                    book.costPrice = data.costPrice;
                    book.sellingPrice = data.sellingPrice;
                    book.stock = data.stock;
                    book.updatedAt = new Date();
                    await book.save()
                    t.commit()
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
            t.rollback();
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
async function UpdateBeginningStock(data,t,beginningStock){
    console.log(beginningStock)
    const bookReport = await db.BookReport.create({
        bookId:data.bookId,
        date:data.createdAt,
        beginningStock:beginningStock,
        endingStock:0,
        phatSinh:0
    },{transaction:t})
    console.log(bookReport)
}

module.exports = {
    createNewBook: createNewBook,
    getAllBooks: getAllBooks,
    updateBookData: updateBookData,
    deleteBook: deleteBook,
    UpdateBeginningStock:UpdateBeginningStock,
}