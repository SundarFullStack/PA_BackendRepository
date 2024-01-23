const express = require("express");
const router = express.Router(); 
const { AuthenticateUser } = require("../Controller/login")




router.post("/", async (req, res) => {

    try {

        const { email, password } = await req.body;

        const loginCredentials = await AuthenticateUser(email,password);

        // console.log("loginCredentials", loginCredentials);

        if (loginCredentials == "Invalid Username or password") {
            res.status(200).json({
                success: false,
                message: "Invalid Username or password",
            })
        } else if (loginCredentials == "Server Busy") {
            res.status(500).json({
                success:false,
                message: "Server Busy",
            })
        }
        else {

     

            
            res.status(200).json({
                success: true,
            message: "User Authenticated Successfully!!",
            token:loginCredentials.token,
           })
        }
        
    } catch (error) {
        console.log("Error", error),
        console.log("Can't able to authenticate User!!")
    }
    
})

module.exports = router;