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
    invoice.initialPrice=newTotalPriceBook
    invoice.discountPrice=discountPrice
    invoice.totalPrice=(newTotalPriceBook-discountPrice)
    const customer = await db.Customer.findOne({
        where:{customerId:invoice.customerId}
    })
    await db.DeptReport.create({
        customerId:customer.customerId,
        beginningDept:invoice.totalPrice,
        endingDept:0,
        phatSinh:0,
    })
    await invoice.save();
}




async function UpdateBookStockAfterInvoiceAndCheckCustomer(datas){
    console.log(datas)
    for (const data of datas) {
      const book =await db.Book.findOne({where:{bookId:data.bookId}})
      const invoice =await db.Invoice.findOne({where:{invoiceId:data.invoiceDetailId}})
      const customer =await db.Customer.findOne({where:{customerId:invoice.customerId}})
      const invoiceRegulation =await db.Regulation.findOne({where:{regulationId:2}})
      book.stock -= data.quantity
      if (book.stock <0 || customer.dept>20000){
        throw new Error("you are excess regulation")
      }
      await book.save();  
      console.log('2')
    }
  }
async function UpdatePhatSinhBook(data){
    data.forEach(async(book)=>{
        await db.BookReport.create({
            bookId:book.bookId,
            beginningStock:0,
            endingStock:0,
            phatSinh:book.quantity
        })
    })
}



module.exports ={
    PriceEachInvoiceDetailId:PriceEachInvoiceDetailId,
    CalculateTotalPrice:CalculateTotalPrice,
    UpdateBookStockAfterInvoiceAndCheckCustomer:UpdateBookStockAfterInvoiceAndCheckCustomer,
    UpdatePhatSinhBook:UpdatePhatSinhBook,
}