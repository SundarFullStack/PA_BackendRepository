const jwt = require("jsonwebtoken");
const userDB = require("../Model/user");
const dotenv = require("dotenv");
dotenv.config();

const AuthenticateUser = async(req,res,next)=>{
    
    try {

        const token = req.headers.authorization;

        const verifytoken = jwt.verify(token,process.env.login_secret_token);

        const rootUser = await User.findOne({ _id: verifytoken._id })
        
        console.log("token",token)
        console.log("verifyToken",verifytoken)
        console.log("rootUser",rootUser)


        if(!rootUser) {throw new Error("user not found")}

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next();
      
        
    } catch (error) {

        res.status(401).json({status:401,message:"Unauthorized no token provide"})
        
    }
    
}

module.exports = AuthenticateUser;