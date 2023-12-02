const User = require("../Model/user");
const verifyUser = require("../Model/verifyUser");
const { sendMail } = require("./SendMail");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

//Insert Verify User Controller

async function InsertVerifyUser(name, email, password) {
    try {
        const salt = await bcrypt.genSalt(10);

        const hashedPass = await bcrypt.hash(password, salt);

        const token = generateToken(email);

        const newUser = new verifyUser({
            name: name,
            email: email,
            password: hashedPass,
            token:token
        })

        const activationLink = `http://localhost:4000/signin/${token}`;

        const content = `<h4>Hi, there</h4>
        <h5>Welcome to the app</h5>
        <p>Thank You for signing Up, Click on the below link to activate account.</p>
        <a href="${activationLink}">Click Here</a>
        <p>Regards</p>
        <p>Sundar</p>
        `
        let savedUser = await newUser.save();
        
        sendMail(email, "Verify User", content);

        return savedUser;
   
    }catch(error){
        console.log("Error in inserting User",error);
    }
}

// JWT TOken Generator

function generateToken(email) {
    
    const token = jwt.sign(email, process.env.signup_secret_key);
    return token;
}


//Insert SignUp User Controller

async function InsertSignUpUser(token) {

    try {
        let userVerify = await verifyUser.findOne({ token: token });
        // console.log("userVerify",userVerify)

    if (userVerify) {
        
        const newUser = new User({
            name: userVerify.name,
            email: userVerify.email,
            password: userVerify.password,
            forgotPassword: {},
            token:userVerify.token
        })

        // console.log("userVerify", userVerify);
        
        // console.log("newUser",newUser)

        await newUser.save();

        await verifyUser.deleteOne({ token:token });

        const content = `<h1>Registration Successful</h1>
        <h5>Welcome to our app</h5>
        <p>You are successfully register!!!</p>
        <p>Regards</p>
        <p>Sundar</p>`

        sendMail(userVerify.email, "User Registered", content);

        return `<h1>Registration Successful</h1>
        <h5>Welcome to our app</h5>
        <p>You are successfully register!!!</p>
        <p>Regards</p>
        <p>Sundar</p>`

    }
    else {
        return `<h1>Registration Failed</h1>
        <p>Link Expired.....</p>
        <p>Regards</p>
        <p>Sundar</p>`
    }
    }
    catch (error) {

        console.log(error);

        return `<html>
        <body><h1>Registration Failed</h1>
        <p>Unexpected Error Happened....</p>
        <p>Regards</p>
        <p>Sundar</p></body>
        </html>`
        
    }
    
}

module.exports = { InsertVerifyUser,InsertSignUpUser };     