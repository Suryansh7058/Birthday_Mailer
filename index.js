const nodemailer = require('nodemailer');
const cron = require('node-cron');
require('dotenv').config();
const collegeStaff = require('./College_Staff.json');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const birthday = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');

  let staffDetails = '';
  collegeStaff.forEach((staff) => {
    if (staff.DOB.substring(3, 5) === mm && staff.DOB.substring(0, 2) === dd) {
      staffDetails += `Name: ${staff.Name}\nJob Role: ${staff.JobRole}\nCollege: ${staff.institution}\nBranch: ${staff.department}\nContact Number: ${staff.MobileNumber}\n\n\n`;
    }
  });
  return staffDetails;
};
birthday();

let monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getDate = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');

  return `${dd} - ${monthNames[today.getMonth()]} - ${today.getFullYear()}`;
};

let mailOptions = {
  from: process.env.EMAIL,
  to: 'Suryanshsingh7058@outlook.com',
  subject: "Email from Suryansh's Mail App ",
  text: `Staff With Birthday on ${getDate()} :\n\n\n${birthday()}`,
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

