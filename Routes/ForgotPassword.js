const express = require("express");
const router = express.Router();
const UserColl = require("../Model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { sendMail } = require("../Controller/SendMail");

// EMAIL VERIFICATION FOR FORGOT PASSWORD
// METHOD: POST

router.post("/", async (req, res) => {
  try {
    const { email } = await req.body;

    const UserValid = await UserColl.findOne({ email: email });

    if (UserValid) {
      // GENERATING TOKEN FOR FORGOT PASSWORD TRACKING

      const token = await generateToken(email);

      // THE PASSWORD UPDATION FRONT END PAGE LINK WAS SHARING

      let activationLink = `http://prod-frontend-server.s3-website-us-east-1.amazonaws.com/ForgotPassword/PassUpdate/${token}`;

      const content = `<h4>Hi, there</h4>
         <h5>Welcome to the app</h5>
         <p>Click on the below link to Change your Password.</p>
         <a href="${activationLink}">Click Here</a>
         <p>Regards</p>
         <p>Sundar T</p>
         `;

      sendMail(email, "Change Password", content);

      if (sendMail) {
        res.status(200).json({
          success: true,
          message: "Email Successfully send for your registered Email Id",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Error in sending email",
        });
      }
    }
  } catch (error) {
    console.log("Error", error);
  }
});

//JWT Token Generator

const generateToken = async (email) => {
  const token = await jwt.sign(email, process.env.forgot_Pass_token);
  // console.log("token",token)
  return token;
};

//UPDATING NEW PASSWORD WITH TOKEN IDENTIFICATION

router.post("/updatePassword", async (req, res) => {
  try {
    const { email, password, token } = await req.body;

    // HASHING PASSWORD WITH CERTAIN DIGITS USING "BCRYPT"

    const salt = await bcrypt.genSalt(10);

    const hashedPass = await bcrypt.hash(password, salt);

    // UPDATING OLD PASSWORD WITH NEW ONE

    const updatedUser = await UserColl.updateOne(
      { email: email },
      { $set: { password: hashedPass } }
    );

    if (updatedUser) {
      res.status(200).json({
        success: true,
        message: "Password Changes Successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Can't able to change password",
      });
    }
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = router;
