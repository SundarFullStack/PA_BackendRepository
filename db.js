const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MongoDB_URL)
        console.log("Database Connected Successfully")
        
    } catch (error) {
        console.log("Error",error)
    }
}

module.exports = connectDB;