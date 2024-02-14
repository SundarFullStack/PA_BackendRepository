const express = require("express");
const router = express.Router();
const { CheckUser } = require("../Controller/login");
const { InsertVerifyUser, InsertSignUpUser } = require("../Controller/Signin");

//OPERATION: FOR SAVING USER IN "USER" TABLE AFTER FINAL TOKEN VERIFICATION

router.get("/:token", async (req, res) => {
  try {
    // CALLING "InsertSignUpUser" CONTROLLER FOR TOKEN VERIFICATION AND SAVING USER
    const response = await InsertSignUpUser(req.params.token);
    // console.log('token',req.params.token)

    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(`<html>
        <body><h1>Registration Failed</h1>
        <p>Can't able to sign Up</p>
        <p>Regards</p>
        <p>Sundar.T</p></body>
        </html>`);
  }
});

//OPERATION: FOR SAVING  USER DETAILS USING EMAIL VERIFICATION

router.post("/verify", async (req, res) => {
  try {
    const { name, email, password } = await req.body;

    // console.log(name, email, password)

    const registeredUser = await CheckUser(email);
    // console.log("registeredUser",registeredUser)

    if (registeredUser == false) {
      // "InsertVerifyUser" FOR SAVING USER DETAILS IN VERIFICATION TABLE

      let savedUser = await InsertVerifyUser(name, email, password);

      if (savedUser) {
        res.status(200).json({
          success: true,
          status: 200,
          message: "User Account Created Successfully",
          data: savedUser,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Error in Creating Account",
          data: savedUser,
        });
      }
    } else if (registeredUser == true) {
      res.status(200).json({
        success: false,
        status: 400,
        message: "User Already Exist",
      });
    } else if (registeredUser == "Server Busy") {
      res.status(500).json({
        success: false,
        status: 500,
        message: "Server Busy",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
