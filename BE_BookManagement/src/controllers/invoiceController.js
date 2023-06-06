import db from "../models/index";
import invoice from "../models/invoice";
import invoiceServices from "../services/invoiceService"
async function CreateInvoice(req, res) {
    try {
        const invoiceRaw = await db.Invoice.create({
            customerId: req.body.customerId,
            discountId: req.body.discountId,
            customerPay: 0,
            initialPrice: 0,
            discountPrice: 0,
            totalPrice: 0,
            remaining: 0,
            status: 0,
        })
        invoiceRaw.invoiceDetailId = invoiceRaw.invoiceId
        invoiceRaw.save();
        const invoice = invoiceRaw
        const [result] = await db.sequelize.query('SELECT LAST_INSERT_ID() as invoiceId');
        const invoiceId = result[0].invoiceId;
        res.status(200).json({
            errCode: 0,
            invoice: invoice,
            invoiceId: invoiceId,
        });
    } catch (e) {
        res.status(400).json({
            errCode: 1,
            errMessage: e.message
        })
    }
}
async function GetAllInvoice(req, res) {
    try {
        const invoices = await db.Invoice.findAll(
            {
                include: [
                    { model: db.Customer },
                    { model: db.Discount },
                    { model: db.InvoiceDetail }
                ]
            });
        res.status(200).json({
            errCode: 0,
            invoices: invoices
        })
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
}
// logic pay or dept
// req body here we have invoiceId
async function PayInvoiceImmediately(req, res) {
    try {
        let invoiceId = req.body.invoiceId
        const invoice = await db.Invoice.findOne({ where: { invoiceId: invoiceId } })
        invoice.remaining = 0;
        invoice.customerPay = invoice.totalPrice;
        invoice.status = 1;
        await db.DeptReport.create({
            customerId: invoice.customerId,
            beginningDept: 0,
            phatSinh: invoice.totalPrice,
            endingDept: 0,
        })
        // create receipt
        await db.Receipt.create({
            invoiceId: req.body.invoiceId,
            customerId: invoice.customerId,
            amountReceived: invoice.customerPay,
        })
        await invoice.save()

        res.status(200).json({
            errCode: 0,
            message: 'successfully!'
        });
    } catch (e) {
        res.status(400).json({
            errCode: 1,
            errMessage: e.message
        })
    }
}
// req body here we has invoiceId customerPay
async function PayInvoiceAfter(req, res) {
    const t = await db.sequelize.transaction()
    try {
        let invoiceId = req.body.invoiceId
        const invoice = await db.Invoice.findOne({ where: { invoiceId: invoiceId } })
        invoice.customerPay += req.body.customerPay
        // Update dept report receive amount 
        await db.DeptReport.create({
            customerId: invoice.customerId,
            beginningDept: 0,
            phatSinh: req.body.customerPay,
            endingDept: 0,
        }, { transaction: t })
        // 
        // customerPay cannot be higer than remaining
        if (req.body.customerPay > invoice.remaining) {
            throw Error('customerPay cannot excess remaining,you cannot excess regulation')
        }
        invoice.remaining = invoice.remaining - req.body.customerPay
        if (invoice.remaining == 0) {
            invoice.status = 1
        }
        // Create Receipt
        await db.Receipt.create({
            invoiceId: invoiceId,
            customerId: invoice.customerId,
            amountReceived: invoice.customerPay,
        }, { transaction: t })
        await invoice.save()
        await t.commit()
        res.status(200).json({
            errCode: 0,
            message: 'successfully!'
        });
    } catch (e) {
        await t.rollback()
        res.status(400).json({
            errCode: 1,
            errMessage: e.message
        })
    }
}
// req body has invoiceId
async function DeptInvoice(req, res) {
    const t = await db.sequelize.transaction();
    try {
        let invoiceId = req.body.invoiceId
        const invoice = await db.Invoice.findOne({ where: { invoiceId: invoiceId } })
        invoice.remaining = invoice.totalPrice;
        await db.DeptReport.create({
            customerId: invoice.customerId,
            beginningDept: invoice.totalPrice,
            phatSinh: 0,
            endingDept: 0,
        }, { transaction: t })
        await invoice.save()
        await t.commit();
        res.status(200).json({
            errCode: 0,
            message: 'successfully!'
        });
    } catch (e) {
        await t.rollback();
        res.status(400).json({
            errCode: 1,
            errMessage: e.message
        })
    }
}

async function CreateInvoiceDetail(req, res) {
    const t = await db.sequelize.transaction();
    try {
        // update phat sinh book r
        const invoiceDetailsArray = Array.isArray(req.body) ? req.body : [req.body];
        // regulation
        await invoiceServices.UpdateBookStockAfterInvoiceAndCheckCustomer(invoiceDetailsArray)
        await invoiceServices.UpdatePhatSinhBook(invoiceDetailsArray)
        const invoiceDetail = await db.InvoiceDetail.bulkCreate(
            invoiceDetailsArray,
            { transaction: t }
        )
        invoiceServices.CalculateTotalPrice(invoiceDetail[0].invoiceDetailId)
        t.commit()
        res.status(200).json({
            errCode: 0,
            invoiceDetail: invoiceDetail
        });
    } catch (e) {
        t.rollback()
        res.status(400).json({
            errCode: 0,
            error: e.message
        })
    }
}
async function GetAllInvoiceDetail(req, res) {
    try {
        const invoiceDetails = await db.InvoiceDetail.findAll({ include: [{ model: db.Book }] })
        res.status(200).json({ invoiceDetails: invoiceDetails })
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
}
module.exports = {
    CreateInvoice: CreateInvoice,
    GetAllInvoice: GetAllInvoice,
    CreateInvoiceDetail: CreateInvoiceDetail,
    GetAllInvoiceDetail: GetAllInvoiceDetail,
    PayInvoiceAfter: PayInvoiceAfter,
    PayInvoiceImmediately: PayInvoiceImmediately,
    DeptInvoice: DeptInvoice,

}

