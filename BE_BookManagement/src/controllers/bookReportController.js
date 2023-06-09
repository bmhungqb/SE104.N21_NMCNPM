import db, { sequelize } from "../models/index";
const { Op } = require('sequelize');


async function getAllBookReport(month) {
    const bookReports = await db.BookReport.findAll({
        where: sequelize.where(sequelize.fn('month', sequelize.col('createdAt')), month)
    });
    let reportData = []
    // initial data bookreport for all bookId
    const books = await db.Book.findAll({ attributes: ['bookId'] })
    books.forEach(book => {
        reportData[book.bookId] = {
            bookId: book.bookId,
            beginningStock: 0,
            endingStock: 0,
            phatSinh: 0
        }
    })
    bookReports.forEach((bookReport) => {
        console.log(bookReport.bookId)
        reportData[bookReport.bookId].beginningStock += bookReport.beginningStock
        reportData[bookReport.bookId].phatSinh += bookReport.phatSinh
    })
    return reportData
}

async function GetBookReport(req, res) {
    let month = req.query.month
    let currentDatas = await getAllBookReport(month)
    if (month > 1) {
        let prevDatas = await getAllBookReport(month - 1)
        // Calculate endingStock for prevData
        prevDatas.forEach(prevData => {
            prevData.endingStock = prevData.beginningStock - prevData.phatSinh
        })
        // Calculate curruntData
        currentDatas.forEach(currentData => {
            currentData.beginningStock += prevDatas[currentData.bookId].endingStock
            currentData.endingStock = currentData.beginningStock - currentData.phatSinh
        })
    }
    res.status(200).json({ currentDatas: currentDatas });
}
module.exports = {
    GetBookReport: GetBookReport
}
