const prodColl = require("../Model/ProdColl");

async function InsertProdData(ProfileCode,
    ProfileDesc,
    ProdStartTime,
    ProdEndTime,
    Line,
    ProfileLen,
    ProdInCharge,
    ProdOperator,
    Shift
    
) {
    try {

        const prodData = new prodColl({
            ProfileCode: ProfileCode,
            ProfileDesc: ProfileDesc,
            ProdStartTime: ProdStartTime,
            ProdEndTime: ProdEndTime,
            Line: Line,
            ProfileLen: ProfileLen,
            ProdInCharge: ProdInCharge,
            ProdOperator: ProdOperator,
            Shift: Shift

        })

        const savedProdData = await prodData.save();

        console.log("savedProdData",savedProdData);

        return savedProdData;
    }

    catch (error) {
        console.log('error',error)
    }
    

    } 
    

    module.exports = {InsertProdData}