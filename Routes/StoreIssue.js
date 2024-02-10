const express = require("express");
const router = express.Router();
const StoreColl = require("../Model/ProfStore");
const StoreIssueColl = require("../Model/ProfileIssue")

//For Get the document or record respective its individual id

router.get("/:ProfileCode", async (req, res) => {
  try {
      const { ProfileCode } = req.params;
    console.log("ProfileCode", ProfileCode);

    const ResDocs = await StoreColl.find({ ProfileCode: ProfileCode });

    console.log("ResDocs", ResDocs);

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

//For Update the Exist Profile in Store Collection

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { qty, updatedDate, updatedBy,PalletNo,Location,Shift } = req.body;

    console.log("id,qty", id, qty, updatedDate, updatedBy);

    // Subtracting Issued qty from exist qty

      const ExistDocs = await StoreColl.findOne({ _id: id });
      
      const ExistDocsQty = ExistDocs.Quantity;

    const FinQty = ExistDocs.Quantity - qty;

    const UpdateProfile = await StoreColl.updateOne(
      { _id: id },
      {
        $set: {
          Quantity: FinQty
        },
      }
    );

      console.log("UpdatedProfile", UpdateProfile);

      if (UpdateProfile) {
          
          const lastPutProfile = await StoreColl.findOne({ _id: id });

          if (lastPutProfile) {
            const savedIssueProfile = new StoreIssueColl({
                ProfileCode: lastPutProfile.ProfileCode,
                ConsumptionDate: lastPutProfile.ConsumptionDate,
                ConsumedQty: ExistDocsQty,
                IssuedQty:qty,
                Quantity: lastPutProfile.Quantity,
                ConsumedBy: lastPutProfile.ConsumedBy,
                PalletNo: PalletNo,
                Location: Location,
                Shift: Shift,
                IssuedDate: updatedDate,
                IssuedBy:updatedBy
            })
              
              const savedData = await savedIssueProfile.save();
              console.log("savedData", savedData);
         }
      

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
