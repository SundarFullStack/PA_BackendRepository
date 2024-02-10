const express = require("express");
const router = express.Router();
const userdb = require("../Model/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization;
    // console.log("token",token)

    const verifytoken = jwt.verify(token, process.env.login_secret_token);
    // console.log("verifyToken", verifytoken.email);

    const UserValid = await userdb.findOne({ email: verifytoken.email });
    // console.log("UserValid", UserValid);

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
