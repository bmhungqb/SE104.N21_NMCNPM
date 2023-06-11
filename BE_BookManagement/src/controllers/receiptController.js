import db from "../models/index"


async function CreateReceipt(req, res) {
    const t = await db.sequelize.transaction();
    const receiptRegulation = await db.Regulation.findOne({ where: { regulationId: 4 } })
    const customer = await db.Customer.findOne({ where: { customerId: req.body.customerId } })
    try {
        const receipt = await db.Receipt.create({
            receiptId: req.body.receiptId,
            customerId: req.body.customerId,
            amountReceived: req.body.amountReceived,
        }, { rollback: t })
        const deptReport = await db.DeptReport.create({
            customerId: receipt.customerId,
            beginningDept: 0,
            endingDept: 0,
            phatSinh: receipt.amountReceived,
        }, { rollback: t })
        if (receiptRegulation.minimumInput == 1) {
            if (req.body.amountReceived > customer.dept) {
                throw new Error("you cannot excess regulation")
            }
            else {
                customer.dept -= req.body.amountReceived
            }
        }
        else {
            if (req.body.amountReceived > customer.dept) {
                customer.dept = 0
            }
            else {
                customer.dept -= req.body.amountReceived
            }
        }
        await customer.save()
        await t.commit()
        res.status(200).json({
            errCode: 0,
            receipt: receipt
        });
    } catch (e) {
        await t.rollback()
        res.status(400).json({
            errCode: 1,
            errMessage: e.message
        })
    }

}
async function ToggleRegulation() {
    const receiptRegulation = await db.Regulation.findOne({ where: { regulationId: 4 } })
    receiptRegulation.minimumInput = (receiptRegulation.minimumInput ? 0 : 1)
    await receiptRegulation.save()
    res.status(200).json({
        errCode: 0,
        errMessage: "successful!"
    })
}
async function GetAllReceipts(req, res) {
    try {
        const receipt = await db.Receipt.findAll({});
        res.status(200).json({
            errCode: 0,
            receipt: receipt
        });
    } catch (e) {
        res.status(400).json({
            errCode: 1,
            errMessage: e.message
        })
    }

}

module.exports = {
    CreateReceipt: CreateReceipt,
    ToggleRegulation: ToggleRegulation,
    GetAllReceipts: GetAllReceipts,
}