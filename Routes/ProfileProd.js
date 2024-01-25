const express = require("express");
const router = express.Router();
const prodModel = require("../Model/ProdColl");
const {InsertProdData} = require("../Controller/profProdControl")


router.post("/",async(req,res)=>{
    try {

        const { ProfileCode,
            ProfileDesc,
            ProdStartTime,
            ProdEndTime,
            Line,
            ProfileLen,
            ProdInCharge,
            ProdOperator,
            Shift
        } = await req.body;

        console.log(ProfileCode,
            ProfileDesc,
            ProdStartTime,
            ProdEndTime,
            Line,
            ProfileLen,
            ProdInCharge,
            ProdOperator,
            Shift
            )
         
if (!ProfileCode   || !ProfileDesc  || !ProdStartTime
    || !ProdEndTime || !Line || !ProfileLen
    || !ProdInCharge  || !ProdOperator|| !Shift ) {
    res.status(400).json({
        success: false,
        message:"Error in receiving Data "
        })
   
} else {
     
    let savedProdData = await InsertProdData(ProfileCode,
        ProfileDesc,
        ProdStartTime,
        ProdEndTime,
        Line,
        ProfileLen,
        ProdInCharge,
        ProdOperator,
        Shift)
    console.log("savedProdData",savedProdData)
    if (savedProdData) {
        
     res.status(200).json({
        success: true,
         message: "Production Details Saved Successfully",
         data:savedProdData
        })
    } else {
             
     res.status(400).json({
        success: false,
         message: "Error in Saving Production Details"

        })
    }

   
}
        
    } catch (error) {
        console.log("error",error)
        res.status(500).json({
            success: false,
            message:"Server Busy",
            error:error
        })
    }
})

module.exports = router;