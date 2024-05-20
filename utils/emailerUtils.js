const common = require("../_helpers/common");

const fs = require("fs");

module.exports = {
  async sendEmail(fileUrl, subject, receiver, data) {
    try {
      console.log(fileUrl, subject, receiver, data);

      let transporter = await common.configuremail();

      let template = fs.readFileSync(fileUrl, { encoding: "utf-8" });

      for (let key of Object.keys(data)) {
        template = template.replace(
          new RegExp("{" + key + "}", "g"),
          data[key] || ""
        );
      }
 
     

      let info = await common.sendMail(
        transporter,
        subject,
        template,
        receiver
      );
      console.log(info, "email info");
    } catch (error) {
      console.log(error);
    }
  },
};