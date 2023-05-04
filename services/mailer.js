const nodeMailer = require("nodemailer");


exports.emailSend = emailData => {
    transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("SMTP ✅");
        }
      });

      
    const transporter = nodeMailer.createTransport({
        host: process.env.HOST,
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: "duetodata123@gmail.com",
                pass: "wbffczxlvgmwemyx",
            }
    });
    return (
        transporter
            .sendMail(emailData)
            .then(info => console.log(`Message sent: ${info.response}`))
            .catch(err => console.log(`Problem sending email: ${err}`))
    );
};