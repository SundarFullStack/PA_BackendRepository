const express = require("express");
const router = express.Router();
const profileDB = require("../Model/Profile");
const lineColl = require("../Model/Line");
const operatorColl = require("../Model/Operator");
const InchargeColl = require("../Model/ShiftIncharge");

//OPERATION: FOR CREATING PROFILE CODES

router.post("/insert", async (req, res) => {
  try {
    const { profileCode, profileDesc } = req.body;
    // console.log(profileCode, profileDesc);

    const verifyProfile = await profileDB.findOne({
      profile_code: profileCode,
    });
    // console.log("verifyProfile",verifyProfile);
    if (!verifyProfile) {
      const profileData = new profileDB({
        profile_code: profileCode,
        profile_desc: profileDesc,
      });

      const savedProfile = await profileData.save();

      if (savedProfile) {
        res.status(200).json({
          success: true,
          message: "Profile Added Successfull",
          data: savedProfile,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Error In Adding Profile",
        });
      }

      // console.log(savedProfile);
    } else {
      res.status(400).json({
        success: false,
        message: "Profile Already Exist",
      });
    }
  } catch (error) {
    console.log("Error", error);
  }
});

// OPERATION: SEND PROFILE CODES AGAINST CODES FOR DROPDOWNS FROM "profileDB" TABLE

router.get("/profileCode", async (req, res) => {
  try {
    const profileCodeData = await profileDB.find();

    if (profileCodeData) {
      res.status(200).json({
        success: true,
        message: "Profile Code Fetched Successfully!",
        profileCode: profileCodeData,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error in fetching Profile Code!",
      });
    }
  } catch (error) {
    console.log("Error", error);
  }
});

// OPERATION: SEND PRODUCTION LINES FOR DROPDOWNS FROM LINE TABLE

router.get("/line", async (req, res) => {
  try {
    const lineData = await lineColl.find();

    if (lineData) {
      res.status(200).json({
        success: true,
        message: "Line Data fetching Successfully!",
        data: lineData,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error In fetching Line Data",
      });
    }
  } catch (error) {
    console.log("Error", error);
  }
});

// OPERATION: SEND PRODUCTION OPERATORS FOR DROPDOWNS FROM "operatorColl" TABLE

router.get("/operator", async (req, res) => {
  try {
    const operatorData = await operatorColl.find();

    if (operatorData) {
      res.status(200).json({
        success: true,
        message: "operator Data fetching Successfully!",
        data: operatorData,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error In fetching operator Data",
      });
    }
  } catch (error) {
    console.log("Error", error);
  }
});

//OPERATION: SEND PRODUCTION IN-CHARGE FOR DROPDOWNS FROM "InchargeColl" TABLE

router.get("/incharge", async (req, res) => {
  try {
    const inchargeData = await InchargeColl.find();

    if (inchargeData) {
      res.status(200).json({
        success: true,
        message: "Incharge Data fetching Successfully!",
        data: inchargeData,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Error In fetching Incharge Data",
      });
    }
  } catch (error) {
    console.log("Error", error);
  }
});

module.exports = router;
