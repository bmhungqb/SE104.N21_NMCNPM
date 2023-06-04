import db from "../models/index";

let getAllRegulation = (regulationId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let regulation = ''
            if (regulationId === 'ALL') {
                regulation = await db.Regulation.findAll({
                    attributes: {
                    }
                })
            }
            if (regulationId && regulationId !== 'ALL') {
                regulation = await db.Regulation.findOne({
                    where: { regulationId: regulationId },
                    attributes: {
                    }
                })
            }
            resolve(regulation)
        } catch (e) {
            console.log(e)
            reject(e)
        }
    })
}
let CreateRegulation = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const regulation = await db.Regulation.create({
                // regulationId: data.regulationId,
                name: data.name,
                minimumInput: data.minimumInput,
                minimumStock: data.minimumStock,
                maximumDept: data.maximumDept
            });
            resolve({
                errCode: 0,
                regulation: regulation
            })
        } catch (e) {
            console.log(e);
            reject(e);
        }
    })
}

let UpdateRegulation = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let regulation = await db.Regulation.findOne({
                where: { regulationId: data.regulationId },
                raw: false
            })
            if (regulation) {
                regulation.name = data.name;
                regulation.minimumInput = data.minimumInput;
                regulation.minimumStock = data.minimumStock;
                regulation.maximumDept = data.maximumDept;
                regulation.updatedAt = new Date();
                await regulation.save()
                resolve({
                    errCode: 0,
                    message: 'Update the book succeeds! '
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let deleteRegulation = (regulationId) => {
    return new Promise(async (resolve, reject) => {
        let regulation = await db.Regulation.findOne({
            where: { regulationId: regulationId }
        })
        if (!regulation) {
            resolve({
                errCode: 2,
                errMessage: "The regulation isn't exist"
            })
        }
        await db.Regulation.destroy({
            where: { regulationId: regulationId }
        })
        resolve({
            errCode: 0,
            message: 'The regulation is deleted'
        })
    })
}

module.exports = {
    CreateRegulation: CreateRegulation,
    getAllRegulation: getAllRegulation,
    UpdateRegulation: UpdateRegulation,
    deleteRegulation: deleteRegulation,
}