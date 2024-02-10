const express = require("express");
const router = express.Router();
const QualityColl = require("../Model/ProfQualiy") 
const ReasonModel = require("../Model/QualityReason")
const PalletModel = require("../Model/QualityPallets")
const LocationModel = require("../Model/QualityLocation")
const InChargeModel = require("../Model/QualityInCharge")
//For Saving All Quality Details

router.post("/", async (req, res) => {
    try {
        const { ProfileCode,
            HoldReason,
            HoldedDate,
            Quantity,
            Status,
            HoldedBy,
            PalletNo,
            Location,
            Shift } = await req.body;
        
        console.log(ProfileCode,
            HoldReason,
            HoldedDate,
            Quantity,
            Status,
            HoldedBy,
            PalletNo,
            Location,
            Shift )

        if (!ProfileCode || !HoldReason || !HoldedDate || !Quantity
            || !Status || !HoldedBy || !PalletNo || !PalletNo || !Location || !Shift) {
            
            res.status(400).json({
                success: false,
                message:"Please Ensure to Fill All Fields!!"
            })
        } else {
            const QualityData = new QualityColl({
                ProfileCode: ProfileCode,
                HoldReason: HoldReason,
                HoldedDate: HoldedDate,
                Quantity: Quantity,
                Status: Status,
                HoldedBy: HoldedBy,
                PalletNo: PalletNo,
                Location: Location,
                Shift: Shift,
              });
                
                const savedData = await QualityData.save();
                console.log("Controller",savedData);

            if (savedData) {
                res.status(200).json({
                    success: true,
                    message: "Quality Data Saved Successfully!!",
                    QualityData:savedData
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: "Can't able to save Quality Data!!",
                })
            }
        };

       
    } catch (error) {
        console.log('error',error)
   }
})


//For Selecting All Quality Details

router.post("/report", async (req, res) => {
    try {
        const {ProfileCode,StartDate,EndDate} = await req.body;

    //Aggregate Filteration

    const matchCriteria = {
        ProfileCode:ProfileCode,
        HoldedDate: {
          $gte: new Date(StartDate),
          $lte: new Date(EndDate),
        },
       
      };
    
      //Aggregation pipeline

      const pipeline = [
        {
          $match: matchCriteria,
        },
      ];
    
      //Aggregate operation

      const result = await QualityColl.aggregate(pipeline)
    
        // console.log('Aggregate result:', result);
    
    
    if (result) {
        res.status(200).json({
            success:true,
            message: "Quality Details Fetched Successfully!!!",
            report:result
            

        })
    } else {
        res.status(400).json({
            success:false,
            message: "Error In Fetching Quality Details!!!",
            

        })
    }
   }catch(error){
        console.log("error", error);
        res.status(500).json({
            success: false,
            message: "Server Busy",
            Error: error
        })
   }
})

//Select Quality Reasons

router.get("/Reason", async (req, res) => {
    const reasons = await ReasonModel.find();
    // console.log(reasons)
 
    if (reasons) {
        res.status(200).json({
            success:true,
            message: "Reason Details Fetched Successfully!!!",
            Reasons:reasons
            

        })
    } else {
        res.status(400).json({
            success:false,
            message: "Error In Fetching Reason Details!!!",
            

        })
    }
})

//Select Quality InCharge

router.get("/InCharge", async (req, res) => {
    const InCharge = await InChargeModel.find();
    // console.log(InCharge)
 
    if (InCharge) {
        res.status(200).json({
            success:true,
            message: "InCharge Details Fetched Successfully!!!",
            InCharge:InCharge
            

        })
    } else {
        res.status(400).json({
            success:false,
            message: "Error In Fetching InCharge Details!!!",
            

        })
    }
})
//Select Quality Pallets

router.get("/Pallets", async (req, res) => {
    const Pallets = await PalletModel.find();
    // console.log(Pallets)
 
    if (Pallets) {
        res.status(200).json({
            success:true,
            message: "Pallets Details Fetched Successfully!!!",
            Pallets:Pallets
            

        })
    } else {
        res.status(400).json({
            success:false,
            message: "Error In Fetching Pallets Details!!!",
            

        })
    }
})
//Select Quality location

router.get("/Location", async (req, res) => {
    const Location = await LocationModel.find();
    // console.log(Location)
 
    if (Location) {
        res.status(200).json({
            success:true,
            message: "Location Details Fetched Successfully!!!",
            Location:Location
            

        })
    } else {
        res.status(400).json({
            success:false,
            message: "Error In Fetching Location Details!!!",
            

        })
    }
})

//For Deleting All Quality Details

// router.delete("/deleteAll", async (req, res) => {
//     try {
//         const deleteAll = await QualityColl.deleteMany();
//        if(deleteAll){
//         res.status(200).json({
//             success: true,
//             message:"All Details Deleted Successfully!!!"
//         })
//        }
//     } catch (error) {
//         console.log("error",error)
//     }
// })


module.exports = router;