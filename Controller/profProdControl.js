const prodColl = require("../Model/ProdColl");

// InsertProdData CONTROLLER IS USED FOR SAVING PRODUCTION DETAILS

async function InsertProdData(
  ProfileCode,
  ProdStartTime,
  ProdEndTime,
  Line,
  Scrap,
  ProfileLen,
  ProdInCharge,
  ProdOperator,
  Shift
) {
  try {
    const prodData = new prodColl({
      ProfileCode: ProfileCode,
      ProdStartTime: ProdStartTime,
      ProdEndTime: ProdEndTime,
      Line: Line,
      Scrap: Scrap,
      ProfileLen: ProfileLen,
      ProdInCharge: ProdInCharge,
      ProdOperator: ProdOperator,
      Shift: Shift,
    });

    // SAVING PRODUCTION DETAILS OF DATA IN "prodData" INSTANCE OBJECT

    const savedProdData = await prodData.save();

    return savedProdData;
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = { InsertProdData };
