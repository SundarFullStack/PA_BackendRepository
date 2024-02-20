const User = require("../Model/user");
const verifyUser = require("../Model/verifyUser");
const { sendMail } = require("./SendMail");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

//"InsertVerifyUser" IS USED TO SAVE USER DETAILS IN VERIFICATION TABLE

async function InsertVerifyUser(name, email, password) {
  try {
    // HASHING PASSWORD WITH CERTAIN DIGITS USING "BCRYPT"

    const salt = await bcrypt.genSalt(10);

    const hashedPass = await bcrypt.hash(password, salt);

    // GENERATING TOKEN FOR EMAIL VERIFICATION

    const token = generateToken(email);

    const newUser = new verifyUser({
      name: name,
      email: email,
      password: hashedPass,
      token: token,
    });

    const activationLink = `https://production-backend-server-com.onrender.com/signin/${token}`;

    const content = `<h4>Hi, there</h4>
        <h5>Welcome to the app</h5>
        <p>Thank You for signing Up, Click on the below link to activate your account.</p>
        <a href="${activationLink}">Click Here</a>
        <p>Regards</p>
        <p>Sundar</p>
        `;

    let savedUser = await newUser.save();

    // CALLING "sendMail" FOR EMAIL TRANSPORTATION AFTER SAVING DETAILS

    sendMail(email, "Verifying User", content);

    return savedUser;
  } catch (error) {
    console.log("Error in inserting User", error);
  }
}

// JWT TOken Generator

function generateToken(email) {
  const token = jwt.sign(email, process.env.signup_secret_key);
  return token;
}

//"InsertSignUpUser" IS USED FOR SAVING USER DETAILS IN "USER" TABLE
// AFTER THE EMAIL VERIFICATION WITH TOKEN CONFIRMATION

async function InsertSignUpUser(token) {
  try {
    let userVerify = await verifyUser.findOne({ token: token });

    if (userVerify) {
      const newUser = new User({
        name: userVerify.name,
        email: userVerify.email,
        password: userVerify.password,
        forgotPassword: {},
        token: userVerify.token,
      });

      // SAVING USER IN "USER" COLLECTION

      await newUser.save();

      // DELETING THAT SPECIFIC USER IN VERIFICATION TABLE AFTER COMPLETE REGISTRATION

      await verifyUser.deleteOne({ token: token });

      const content = `<h1>Registration Successful</h1>
        <h5>Welcome to our app</h5>
        <p>You are successfully register!!!</p>
        <p>Regards</p>
        <p>Sundar</p>`;

      // SUCCESSFUL REGISTRATION WILL SHARE AS EMAIL USING "sendMail"

      sendMail(userVerify.email, "User Registered", content);

      return `<h1>Registration Successful</h1>
        <h5>Welcome to our app</h5>
        <p>You are successfully register!!!</p>
        <p>Regards</p>
        <p>Sundar</p>`;
    } else {
      return `<h1>Registration Failed</h1>
        <p>Link Expired.....</p>
        <p>Regards</p>
        <p>Sundar</p>`;
    }
  } catch (error) {
    console.log(error);

    return `<html>
        <body><h1>Registration Failed</h1>
        <p>Unexpected Error Happened....</p>
        <p>Regards</p>
        <p>Sundar</p></body>
        </html>`;
  }
}

module.exports = { InsertVerifyUser, InsertSignUpUser };
