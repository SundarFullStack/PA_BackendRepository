const User = require("../Model/user");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const client = require("../redis")

async function CheckUser(email) {
    
    try {

        const userValid = await User.findOne({ email: email });
        // console.log("userValid",userValid)
        
        if (!userValid) {
            return false
        }
        else {
            return true
        }
        
    } catch (error) {

        return "Server Busy"

    }
}

async function AuthenticateUser(email, password) {
    try {

        const userValid = await User.findOne({ email: email });
        
        const validPassword = await bcrypt.compare(password, userValid.password);

        if (validPassword) {
            
            const token = jwt.sign({ email }, process.env.login_secret_token);

            const response = {
                id: userValid._id,
                name: userValid.name,
                email: userValid.email,
                token: userValid.token,
                status:true
            }

            await client.set(`key-${email}`, JSON.stringify(response));

            await User.findOneAndUpdate({ email: userValid.email }, { $set: { token: token } }, { new: true });

            return response

        } else {
            return "Invalid Username or password"
        }
        
    } catch (error) {

        console.log("Error", error);

        return "Server Busy"
        
    }
}


async function AuthorizeUser(token) {
    
    try {

        const decodeToken = jwt.verify(token, process.env.login_secret_token);

        if (decodeToken) {
            
            const email = decodeToken.email;

            const auth = await client.get(`key-${email}`);
            // console.log("auth",auth)

            if (auth) {
                
                const data = JSON.parse(auth);
                // console.log("auth1",data)

                return data
            }
            else {
                const data = await User.findOne({ email: email })
                // console.log("auth2",data)

                return data
            }


        }
        return false
        
    } catch (error) {

        console.log("Error",error)
        
    }
    
}

module.exports = {CheckUser,AuthenticateUser,AuthorizeUser}