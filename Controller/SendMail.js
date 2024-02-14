const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

// TRANSPORTER USED TO CREATE TRANSPORT FOR SEND EMAIL WITH "createTransport"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.nodemailer_user,
    pass: process.env.nodemailer_password,
  },
});

// "sendMail" COMPONENT FOR SEND MAIL WITH PROVIDED CONTENT USING TRANSPORTER

function sendMail(toEmail, subject, content) {
  const mailOption = {
    from: "meenakshisunder183017@gmail.com",
    to: toEmail,
    subject: subject,
    html: content,
  };

  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log("Error Occured:", error);
    } else {
      console.log("Email Send Successfully:", info.response);
    }
  });
}

module.exports = { sendMail };
