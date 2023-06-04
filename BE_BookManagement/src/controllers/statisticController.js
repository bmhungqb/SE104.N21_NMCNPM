import db, { sequelize } from "../models/index"

async function GetMonthStatistic(req, res) {
    const month = req.query.month
    console.log(invoices)
    let monthlyRevenue = 0
    let monthlyNewCustomer = 0
    let monthlyBookSoldQuantity = 0
    const invoices = await db.Invoice.findAll({
        where: sequelize.where(sequelize.fn('month', sequelize.col('createdAt')), month)
    })
    const customers = await db.Customer.findAll({
        where: sequelize.where(sequelize.fn('month', sequelize.col('createdAt')), month)
    })
    const invoiceDetails = await db.InvoiceDetail.findAll({
        where: sequelize.where(sequelize.fn('month', sequelize.col('createdAt')), month)
    })
    invoices.forEach(invoice => {
        monthlyRevenue += invoice.customerPay
    })
    customers.forEach(customer => {
        monthlyNewCustomer++;
    })
    invoiceDetails.forEach(invoiceDetail => {
        monthlyBookSoldQuantity += invoiceDetail.quantity
    })
    let monthlyStatistic = {
        monthlyRevenue: monthlyRevenue,
        monthlyNewCustomer: monthlyNewCustomer,
        monthlyBookSoldQuantity: monthlyBookSoldQuantity,
    }
    res.status(200).json({ monthlyStatistic: monthlyStatistic })
}


module.exports = {
    GetMonthStatistic: GetMonthStatistic
}