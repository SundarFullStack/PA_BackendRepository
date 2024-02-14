const express = require("express");
const router = express.Router();
const StoreColl = require("../Model/ProfStore");

//OPERATION: FOR SENDING PROFILE CONSUMPTION DETAILS WITH RESPECTIVE TO PROFILE CODE

router.get("/:ProfileCode", async (req, res) => {
  try {
    // DESTRUCTURING PROFILE CODE FROM PARAMS OF REQUEST

    const { ProfileCode } = req.params;
    // console.log("ProfileCode", ProfileCode);

    // FINDING RECORDS FROM STORE CONSUMPTION TABLE "StoreColl"

    const ResDocs = await StoreColl.find({ ProfileCode: ProfileCode });

    // console.log("ResDocs", ResDocs);

    if (ResDocs) {
      res.status(200).json({
        success: true,
        message: "Profile Details Fetched Successfully",
        data: ResDocs,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Profile Id Didn't Exist",
      });
    }
  } catch (error) {
    console.log("Error", error);
  }
});

//OPERATION : FOR UPDATING PROFILE ISSUE DETAILS AGAINST DOCUMENT ID "_id" IN STORE TABLE "StoreColl"

router.put("/update/:id", async (req, res) => {
  try {
    // DESTRUCTURING ID AND ISSUE DETAILS FROM PARAMS AND REQUEST BODY

    const { id } = req.params;
    const { qty, updatedDate, updatedBy, PalletNo, Location, Shift } = req.body;

    console.log(qty, updatedDate, updatedBy, PalletNo, Location, Shift )
    // Subtracting Issued qty from exist qty

    const ExistDocs = await StoreColl.findOne({ _id: id });

    const ExistDocsQty = ExistDocs.Quantity;

    const FinQty = ExistDocs.Quantity - qty;

    // UPDATING ISSUE DETAILS IN CONSUMPTION TABLE

    const UpdateProfile = await StoreColl.updateOne(
      { _id: id },
      {
        $set: {
          Quantity: FinQty,
          ConsumedQty: ExistDocsQty,
          IssuedQty: qty,
          PalletNo: PalletNo,
          Location: Location,
          Shift: Shift,
          IssuedDate: updatedDate,
          IssuedBy: updatedBy,
        },
      }
    );

    // console.log("UpdatedProfile", UpdateProfile);

    if (UpdateProfile) {
      res.status(200).json({
        success: true,
        message: "Store Details updated Successfully",
        data: UpdateProfile,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error In Updating Store Details",
      });
    }
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = router;

//ConsumptionQty
//Quantity
//IssuedQty
//IssuedBy
//Issued Date
