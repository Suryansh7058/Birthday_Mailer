const nodemailer = require('nodemailer');
const cron = require('node-cron');
require('dotenv').config();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

let mailOptions = {
  from: process.env.EMAIL,
  to: 'Suryanshsingh7058@outlook.com',
  subject: "Email from Suryansh's Mail App ",
  text: 'Testing Mail Scheduling',
};

cron.schedule('0 0 0 * * *', () => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});
