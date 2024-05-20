
module.exports={

  async configuremail() {
    nodemailer = require("nodemailer");
    let smtpAuth;
    smtpAuth = {
      user: "info@conqt.com",
      pass: "Conqt@123",
    };
    let smtpConfig = {
      host: "smtp.mail.us-east-1.awsapps.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: smtpAuth,
    };
    return new Promise((resolve, reject) => {
      let transporter = nodemailer.createTransport(smtpConfig);

      transporter.verify(function (error, success) {
        if (error) {
          ////console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });
      return resolve(transporter);
    });
  },

  async sendMail(transporter, subject, template = "", email) {
    return new Promise((resolve, reject) => {
      transporter.sendMail(
        {
          from: {
            name: "ConQT",
            address: "info@conqt.com",
          },
          to: email,
          subject: subject,
          html: template ? template : `welcome to VMS`,
        },
        (err, info) => {
          if (err) {
            console.log(err);
            return resolve(err);
          } else {
            //console.log(info);
            return resolve(info);
          }
        }
      );
    });
  },

}