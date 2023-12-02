const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
 
    user: process.env.nodemailer_user,
    pass: process.env.nodemailer_password,
  },
});

// console.log(process.env.nodemailer_user,process.env.nodemailer_password)

function sendMail(toEmail, subject, content) {
    
    const mailOption = {
        from:"meenakshisunder183017@gmail.com",
        to: toEmail,
        subject: subject,
        html:content,   
    }
    // console.log("SenMail",toEmail,subject,content)
    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            console.log("Error Occured:",error)
        }else {
            console.log("Email Send Successfully:",info.response)
        }
    })
}



module.exports = { sendMail };