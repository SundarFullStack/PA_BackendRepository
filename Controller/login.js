const User = require("../Model/user");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// CheckUser FOR VALIDATING USER WITH EMAIL ID. IS USER EXIST OR NOT?

async function CheckUser(email) {
  try {
    const userValid = await User.findOne({ email: email });

    if (!userValid) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return "Server Busy";
  }
}

// AuthenticateUser CONTROLLER IS USED FOR HANDLING LOGIN FUNCTIONALITIES
async function AuthenticateUser(email, password) {
  try {
    const userValid = await User.findOne({ email: email });

    // COMPARING LOGIN PASSWORD WITH REGISTERED PASSWORD

    const validPassword = await bcrypt.compare(password, userValid.password);

    console.log(userValid,validPassword)
    if (validPassword) {
      // CREATING NEW LOGIN TOKEN FOR USER

      const token = jwt.sign({ email }, process.env.login_secret_token);

      const response = {
        id: userValid._id,
        name: userValid.name,
        email: userValid.email,
        token: token,
        status: true,
      };

      // UPDATING THAT NEW LOGIN PASSWORD IN USER COLLECTION

      await User.findOneAndUpdate(
        { email: userValid.email },
        { $set: { token: token } },
        { new: true }
      );

      return response;
    } else {
      return "Invalid Username or password";
    }
  } catch (error) {
    console.log("Error", error);

    return "Server Busy";
  }
}

module.exports = { CheckUser, AuthenticateUser };
