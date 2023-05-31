import db from "../models/index"

async function CreateRegulation(req,res){
    const regulation =await db.Regulation.create({
        regulationId:req.body.regulationId,
        name:req.body.name,
        minimumInput:req.body.minimumInput,
        minimumStock:req.body.minimumStock,
        maximumDept:req.body.maximumDept
    })
    res.status(200).json({regulation:regulation})
}
async function GetAllRegulation(req,res){
    try{
        const regulation = db.Regulation.findAll({})
        res.status(200).json({
            errCode: 0,
            errMessage: "OK",
            regulation
        })
    }   catch(e) {
        res.status(400).json({
            error:e.message
        })
    }

}
// async function UpdateRegulation()

module.exports = {
    CreateRegulation:CreateRegulation,
    GetAllRegulation:GetAllRegulation,
}