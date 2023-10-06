const nodeMailer=require("nodemailer");
const config = require( "../config/config" );

const sendEmail= async(options) =>{

    const transporter = nodeMailer.createTransport( {
        host: config.SMTP_HOST,
        port: config.SMTP_PORT,
        auth: {
          user: config.SMTP_MAIL,
          pass: config.SMTP_PASSWORD
         },
});

    const mailOptions={
        from:config.SMTP_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message,
    }
   await transporter.sendMail(mailOptions);

}

module.exports=sendEmail;