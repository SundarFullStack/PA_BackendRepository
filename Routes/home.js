const express = require("express");
const router = express.Router();
const { AuthorizeUser } = require('../Controller/login');


router.get('/', async (req, res) => {

    try {

        const auth_token = await req.headers.authorization;
        console.log("auth_token",auth_token)
        
        const login_credentials = AuthorizeUser(auth_token);

        const loginData = await login_credentials.then((data) => {
            return data
        })
        // console.log("loginData",loginData)

        if (login_credentials == false) {
            res.status(200).json({
                success: false,
                message:"Invalid Token"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "Token Verified successfully",
                data:loginData
            })
        }
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:"Server Busy"
        })
    }
    
})

module.exports = router;