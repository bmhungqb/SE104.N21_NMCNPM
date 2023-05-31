import db from "../models/index";
import invoice from "../models/invoice";
import invoiceServices from "../services/invoiceService"
async function CreateInvoice(req,res){
    try{
        const invoiceRaw = await db.Invoice.create({
            customerId : req.body.customerId,
            discountId: req.body.discountId,
            customerPay: req.body.customerPay,
            initialPrice:0,
            discountPrice:0,
            totalPrice:0,
            changePrice:0
        })
        invoiceRaw.invoiceDetailId = invoiceRaw.invoiceId
        invoiceRaw.save();
        const invoice = invoiceRaw
        res.status(200).json({
            errCode:0,
            invoice:invoice
        });
    } catch (e) {
        res.status(400).json({
            errCode: 1,
            errMessage:e.message
        })
    }
}
async function GetAllInvoice(req,res){
    try{
        const invoices =await db.Invoice.findAll(
            {include:[
                {model:db.Customer},
                {model:db.Discount},
                {model:db.InvoiceDetail}
        ]});
        res.status(200).json(invoices)
    } catch(e) {
        res.status(400).json({error:e.message})
    }
}
async function CreateInvoiceDetail(req,res){
    const t = await db.sequelize.transaction();
    try{
        await invoiceServices.UpdateBookStockAfterInvoiceAndCheckCustomer(req.body.bookId,req.body.invoiceDetailId,req.body.quantity)
        await invoiceServices.UpdatePhatSinh(req.body)
        const invoiceDetail = await db.InvoiceDetail.create({
            invoiceDetailId: req.body.invoiceDetailId,
            bookId:req.body.bookId,
            quantity:req.body.quantity
        },{transaction:t})
        invoiceServices.CalculateTotalPrice(invoiceDetail.invoiceDetailId)
        t.commit()
        res.status(200).json({invoiceDetail:invoiceDetail});
    } catch(e) {
        t.rollback()
        res.status(400).json({error:e.message})
    }
}
async function GetAllInvoiceDetail(req,res){
    try{
        const invoiceDetails = await db.InvoiceDetail.findAll({include:[{model:db.Book}]})
        res.status(200).json({invoiceDetails:invoiceDetails})
    } catch(e) {
        res.status(400).json({error:e.message})
    }
}
module.exports = {
    CreateInvoice:CreateInvoice,
    GetAllInvoice:GetAllInvoice,
    CreateInvoiceDetail:CreateInvoiceDetail,
    GetAllInvoiceDetail:GetAllInvoiceDetail
}
 
