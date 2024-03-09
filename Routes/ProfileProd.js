const express = require("express");
const router = express.Router();
const prodModel = require("../Model/ProdColl");
const { InsertProdData } = require("../Controller/profProdControl");

// API FOR SAVING ALL PRODUCTION DETAILS IN PRODUCTION COLLECTION
// METHOD:POST
router.post("/", async (req, res) => {
  try {
    const {
      
      ProfileCode,
      ProdStartTime,
      ProdEndTime,
      Line,
      ProfileLen,
      Scrap,
      ProdInCharge,
      ProdOperator,
      Shift,
      UserId
    } = await req.body;

    console.log(UserId,ProfileCode,
        ProdStartTime,
        ProdEndTime,
        Line,
        Scrap,
        ProfileLen,
        ProdInCharge,
        ProdOperator,
        Shift
        )
    
    // ENSURING ALL FIELDS ARE AVAIL OR NOT AND SAVING DETAILS

    if (
      !UserId ||
      !ProfileCode ||
      !ProdStartTime ||
      !ProdEndTime ||
      !Line ||
      !ProfileLen ||
      !Scrap ||
      !ProdInCharge ||
      !ProdOperator ||
      !Shift
    ) {
      res.status(400).json({
        success: false,
        message: "Error in receiving Data ",
      });
    } else {

      // CALLING "InsertProdData"CONTROLLER FOR SAVING PRODUCTION DETAILS

      let savedProdData = await InsertProdData(
        
        ProfileCode,
        ProdStartTime,
        ProdEndTime,
        Line,
        Scrap,
        ProfileLen,
        ProdInCharge,
        ProdOperator,
        Shift,
        UserId
      );

      // console.log("savedProdData", savedProdData);

      if (savedProdData) {
        res.status(200).json({
          success: true,
          message: "Production Details Saved Successfully",
          data: savedProdData,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Error in Saving Production Details",
        });
      }
    }

  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Server Busy",
      error: error,
    });
  }
});

// API FOR SEND PRODUCTION REPORT

router.post("/profReportData", async (req, res) => {
  try {
    const { ProfileCode, StartDate, EndDate,UserId } = await req.body;

    // console.log(ProfileCode, StartDate, EndDate);

    // CONDITION FOR OUR AGGREGATE METHOD

    const matchCriteria = {
      ProfileCode: parseInt(ProfileCode),
      UserId:UserId,
      ProdStartTime: {
        $gte: new Date(StartDate),
        $lte: new Date(EndDate),
      }
    };

    //Aggregation pipeline

    const pipeline = [
      {
        $match: matchCriteria,
      },
    ];

    //Aggregate operation

    const result = await prodModel.aggregate(pipeline);

    // console.log("Aggregate result:", result);

    if (result) {
      res.status(200).json({

        success: true,
        message: "Production Details Fetched Successfully!!!",
        report: result,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error In Fetching Production Details!!!",
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Server Busy",
      Error: error,
    });
  }
});

// API FOR SENDING PRODUCTION DETAILS WITH RESPECTIVE TO PROFILE CODE

router.get("/:ProfileCode", async (req, res) => {
  try {
    const { ProfileCode } = await req.params;
  // console.log("ProfileCode",ProfileCode)
    const ProfileDaa = await prodModel.find({ ProfileCode: ProfileCode });
    // console.log("profileData",profileData)

    if (ProfileDaa) {
      res.status(200).json({
        success: true,
        message: "Profile Details Fetched Successfully",
        data:ProfileDaa
      })
    } else {
      res.status(400).json({
        success: false,
        message: "No Details found for this code"
      })
    }
  } catch (error) {
    console.log("error",error)
  }
})



//Delete all Data from production Table

router.delete("/deleteAll", async (req, res) => {
    try {


        const deleted = await prodModel.deleteMany();
    if (deleted) {
        res.status(200).json({
            success: true,
            message: "successfully Deleted All Data"
        })
    } else {
        res.status(400).json({
            success: false,
            message: "Can't able to delete all data"
        })
    }
    }catch(error){
        res.status(500).json({
            success: false,
            Error: error

        })
        console.log("error",error)
    }

})

module.exports = router;
