import db from "../models/index";
// After adding 1 InvoiceDetail ,We recalculate sum of price book then update again
async function PriceEachInvoiceDetailId(id){
    const invoiceDetails = await db.InvoiceDetail.findAll({include:[{model:db.Book}]})
    let totalPrice = 0;
        invoiceDetails.forEach((invoiceDetail)=>{
            if (invoiceDetail.invoiceDetailId==id)
            totalPrice += (invoiceDetail.Books[0].sellingPrice*invoiceDetail.quantity);
        })
    return totalPrice
}
async function CalculateTotalPrice(id){
    const invoice = await db.Invoice.findOne({
        where:{invoiceDetailId:id},
        include:[{model:db.Customer},{model:db.Discount},{model:db.InvoiceDetail}]
    })
    let newTotalPriceBook = await PriceEachInvoiceDetailId(id)
    let discountPrice = newTotalPriceBook * invoice.Discounts[0].percentage /100
    let changePrice = invoice.customerPay - (newTotalPriceBook - discountPrice)
    if(changePrice<0){
        const customer = await db.Customer.findOne({
            where:{customerId:invoice.customerId}
        })
        customer.dept += Math.abs(changePrice) 
        await customer.save();
    }
    invoice.initialPrice=newTotalPriceBook
    invoice.discountPrice=discountPrice
    invoice.totalPrice=(newTotalPriceBook-discountPrice)
    invoice.changePrice=changePrice
    await invoice.save();
}

async function UpdateBookStockAfterInvoiceAndCheckCustomer(bookId,invoiceId,quantity){
    const book =await db.Book.findOne({where:{bookId:bookId}})
    const invoice =await db.Invoice.findOne({where:{invoiceId:invoiceId}})
    const customer =await db.Customer.findOne({where:{customerId:invoice.customerId}})
    const invoiceRegulation =await db.Regulation.findOne({where:{regulationId:2}})
    book.stock -= quantity
    if (book.stock <0 || customer.dept>20000){
        throw new Error("you are excess regulation")
        return;
    }
    await book.save();  
}
async function UpdatePhatSinh(data){
    console.log(data)
    const bookReport = await db.BookReport.create({
        bookId:data.bookId,
        beginningStock:0,
        endingStock:0,
        phatSinh:data.quantity
    })
}



module.exports ={
    PriceEachInvoiceDetailId:PriceEachInvoiceDetailId,
    CalculateTotalPrice:CalculateTotalPrice,
    UpdateBookStockAfterInvoiceAndCheckCustomer:UpdateBookStockAfterInvoiceAndCheckCustomer,
    UpdatePhatSinh:UpdatePhatSinh,
}