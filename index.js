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

  // Date Format in JSON dd/mm/yyyy
  collegeStaff.forEach((staff) => {
    if (staff.DOB.substring(3, 5) === mm && staff.DOB.substring(0, 2) === dd) {
      staffDetails += `Name: ${staff.Name}\nJob Role: ${staff.JobRole}\nCollege: ${staff.institution}\nBranch: ${staff.department}\nContact Number: ${staff.MobileNumber}\nEmail ID: ${staff.email} \n\n`;
    }
  });
  return staffDetails.length > 0 ? staffDetails : 'No Birthdays Today';
};

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
// suryanshsingh989@gmail.com, vivekchourey60@gmail.com ,mrsrashmisrivastava@gmail.com ,
//  aajajoo@dypcoeakurdi.ac.in , hhpatel@dypcoeakurdi.ac.in
let mailOptions = {
  from: process.env.EMAIL,
  to: 'suryanshsingh989@gmail.com, vivekchourey60@gmail.com',
  subject: `Staff With Birthday on ${getDate()}`,
  text: birthday(),
};
// cron.schedule('0 0 0 * * *', () => {
//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
// });
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
