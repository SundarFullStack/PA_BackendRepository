const express = require("express");
const router = express.Router();
const StoreColl = require("../Model/ProfStore");
const PalletModel = require("../Model/StorePallets")
const LocationModel = require("../Model/StoreLocation")
const StoreInCHargeModel = require("../Model/StoreInCharge")
const StoreIssueColl = require("../Model/ProfileIssue")
//For Profile Consumption
router.post("/", async (req, res) => {
  try {
    const {
      ProfileCode,
      ConsumptionDate,
      Quantity,
      ConsumedBy,
      PalletNo,
      Location,
      Shift,
    } = await req.body;

    // console.log(
    //   ProfileCode,
    //   ConsumptionDate,
    //   Quantity,
    //   ConsumedBy,
    //   PalletNo,
    //   Location,
    //   Shift
    // );

    if (
      !ProfileCode ||
      !ConsumptionDate ||
      !Quantity ||
      !ConsumedBy ||
      !PalletNo ||
      !Location ||
      !Shift
    ) {
      res.status(400).json({
        success: false,
        message: "Please Ensure to Fill All Fields!!",
      });
    } else {
      const StoreData = new StoreColl({
        ProfileCode: ProfileCode,
        ConsumptionDate: ConsumptionDate,
        Quantity: Quantity,
        ConsumedBy: ConsumedBy,
        PalletNo: PalletNo,
        Location: Location,
        Shift: Shift
      });

      const savedData = await StoreData.save();
      

      if (savedData) {
        res.status(200).json({
          success: true,
          message: "Store Details Saved Successfully!!",
          QualityData: savedData,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Can't able to save Store Details!!",
        });
      }
    }
  } catch (error) {
    console.log("error", error);
  }
});

//For Getting Report
router.post("/report", async (req, res) => {
    try {
      const { ProfileCode, StartDate, EndDate } = await req.body;
      
      // console.log(ProfileCode, StartDate, EndDate);

      //Aggregate Filteration

      const matchCriteria = {
        ProfileCode:ProfileCode,
        ConsumptionDate: {
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

      const result = await StoreIssueColl.aggregate(pipeline)
    
        // console.log('Aggregate result:', result);
    
    
    if (result) {
        res.status(200).json({
            success:true,
            message: "Store Details Fetched Successfully!!!",
            report:result
            

        })
    } else {
        res.status(400).json({
            success:false,
            message: "Error In Fetching Store Details!!!",
            

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

//Select Quality InCharge

router.get("/InCharge", async (req, res) => {
  const InCharge = await StoreInCHargeModel.find();
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


module.exports = router;
