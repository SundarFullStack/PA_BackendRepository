const express = require("express");
const router = express.Router();
const UserColl = require("../Model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

router.post("/", async (req, res) => {
  try {
    const { email } = await req.body;

    const UserValid = await UserColl.findOne({ email: email });

      //   console.log("User", User);
      
      if (UserValid) {

         const token = await  generateToken(email);

         let activationLink = `http://localhost:5173/forgotPassword/${token}`

         

         
          
      }
    
      
    
  } catch (error) {
    console.log("Error", error);
  }


});


//JWT Token Generator

const generateToken =async (email) => {
              
    const token = await jwt.sign(email, process.env.forgot_Pass_token);
    // console.log("token",token)
    return token;
}

module.exports = router;
