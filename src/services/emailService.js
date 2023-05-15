require('dotenv').config();

import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
     // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Duy Manh" <duymanh311999@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: getBodyHTMLEmail(dataSend), // html body
  });
}

let getBodyHTMLEmail = (dataSend) => {
  let result = '';
  if(dataSend.language === 'vi'){
    result =
     `
    <h3>Xin chào ${dataSend.patientName}</h3>
    <p>Bận nhận được Email này vì đã đặt lịch khám bệnh tại Booking Care thành công</p> 
    <p>Thông tin đặt lịch khám bệnh:</p>
     <div><b>Thời gian: ${dataSend.time}</b></div>
     <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

     <p>Nếu các thông tin trên là đúng, vui lòng nhấn vào đường link bên dưới
     để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.
     </p>
     <div>
         <a href=${dataSend.redirectLink} target="_blank">Click here</a>   
         <div>Xin chân thành cảm ơn!</div>     
     </div>
    `
}
if(dataSend.language === 'en'){
  result =
  `
  <h3>Dear ${dataSend.patientName}</h3>
  <p>Busy received this email because you have successfully booked a medical appointment at Booking Care</p> 
  <p>Information to schedule an appointment:</p>
   <div><b>Time: ${dataSend.time}</b></div>
   <div><b>Doctor: ${dataSend.doctorName}</b></div>

   <p>If the above information is correct, please click the link below 
   to confirm and complete the procedure to book an appointment.
   </p>
   <div>
       <a href=${dataSend.redirectLink} target="_blank">Click here</a>   
       <div>Sincerely thank!</div>     
   </div>
  `
}
  return result
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
}