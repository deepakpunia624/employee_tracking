const nodemailer = require("nodemailer");
module.exports = {
  transporter: nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  }),
};
