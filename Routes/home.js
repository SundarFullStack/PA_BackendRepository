const express = require("express");
const router = express.Router();
const userdb = require("../Model/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// VALIDATING THAT USER IS AUTHENTICATED OR NOT AND SEND RESPONSE

router.get("/", async (req, res) => {
  try {
    // RECEIVING TOKEN FROM HEADERS

    const token = req.headers.authorization;

    // VERIFYING RECEIVED TOKEN WITH LOGIN TOKEN

    const verifytoken = jwt.verify(token, process.env.login_secret_token);

    const UserValid = await userdb.findOne({ email: verifytoken.email });

    if (verifytoken) {
      res
        .status(201)
        .json({ status: 201, message: "User Valid", UserData: UserValid });
    } else {
      res.status(401).json({
        success: false,
        message: "User Not Valid",
      });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
    console.log("Error", error);
  }
});

module.exports = router;
