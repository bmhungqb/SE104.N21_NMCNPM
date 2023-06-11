import db from "../models/index";
// After adding 1 InvoiceDetail ,We recalculate sum of price book then update again
async function PriceEachInvoiceDetailId(id) {
    const invoiceDetails = await db.InvoiceDetail.findAll({ include: [{ model: db.Book }] })
    let totalPrice = 0;
    invoiceDetails.forEach((invoiceDetail) => {
        if (invoiceDetail.invoiceDetailId == id)
            totalPrice += (invoiceDetail.Books[0].sellingPrice * invoiceDetail.quantity);
    })
    return totalPrice
}
async function CalculateTotalPrice(id) {
    const invoice = await db.Invoice.findOne({
        where: { invoiceDetailId: id },
        include: [{ model: db.Customer }, { model: db.Discount }, { model: db.InvoiceDetail }]
    })
    let newTotalPriceBook = await PriceEachInvoiceDetailId(id)
    let discountPrice = 0
    if ((invoice.Discounts[0] && invoice.Discounts[0].percentage !== undefined)) {
        discountPrice = newTotalPriceBook * invoice.Discounts[0].percentage / 100
    } else {
        discountPrice = 0
    }
    // if (!invoice.Discounts[0].percentage) {
    //     let discountPrice = 0
    // }
    // else { let discountPrice = newTotalPriceBook * invoice.Discounts[0].percentage / 100 }
    // let discountPrice = newTotalPriceBook * invoice.Discounts[0].percentage / 100
    // let changePrice = invoice.customerPay - (newTotalPriceBook - discountPrice)
    // if change less than 0 update dept update dept report
    // if(changePrice<0){
    //     const customer = await db.Customer.findOne({
    //         where:{customerId:invoice.customerId}
    //     })
    //     customer.dept += Math.abs(changePrice) 
    //     await db.DeptReport.create({
    //         customerId:customer.customerId,
    //         beginningDept:customer.dept,
    //         endingDept:0,
    //         phatSinh:0,
    //     })
    //     await customer.save();
    // }
    invoice.initialPrice = newTotalPriceBook
    invoice.discountPrice = discountPrice
    invoice.totalPrice = (newTotalPriceBook - discountPrice)
    const customer = await db.Customer.findOne({
        where: { customerId: invoice.customerId }
    })
    invoice.remaining = invoice.totalPrice;
    await invoice.save();
}

async function UpdateRankAndPurchaseValue(customerId) {
    const invoices = await db.Invoice.FindAll({ where: { customerId: customerId } })
    const customer = await db.Customer.FindOne({ where: { customerId: customerId } })
    customer.totalPurchaseValue = 0
    invoices.forEach(invoice => {
        customer.totalPurchaseValue += invoice.customerPay
    })
    customer.rank = customer.totalPurchaseValue > 3000000 ? 'gold' : customer.totalPurchaseValue < 1000000 ? 'bronze' : 'sliver'
    await customer.save()
}


async function UpdateBookStockAfterInvoiceAndCheckCustomer(datas) {
    for (const data of datas) {
        const book = await db.Book.findOne({ where: { bookId: data.bookId } })
        const invoice = await db.Invoice.findOne({ where: { invoiceId: data.invoiceDetailId } })
        const customer = await db.Customer.findOne({ where: { customerId: invoice.customerId } })
        const invoiceRegulation = await db.Regulation.findOne({ where: { regulationId: 2 } })
        book.stock -= data.quantity
        if (book.stock < 0 || customer.dept > 20000) {
            throw new Error("you are excess regulation")
        }
        await book.save();
    }
}
async function UpdatePhatSinhBook(data) {
    data.forEach(async (book) => {
        await db.BookReport.create({
            bookId: book.bookId,
            beginningStock: 0,
            endingStock: 0,
            phatSinh: book.quantity
        })
    })
}



module.exports = {
    PriceEachInvoiceDetailId: PriceEachInvoiceDetailId,
    CalculateTotalPrice: CalculateTotalPrice,
    UpdateBookStockAfterInvoiceAndCheckCustomer: UpdateBookStockAfterInvoiceAndCheckCustomer,
    UpdatePhatSinhBook: UpdatePhatSinhBook,
    UpdateRankAndPurchaseValue: UpdateRankAndPurchaseValue
}