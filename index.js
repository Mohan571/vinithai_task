const cron = require('cron');
const XLSX = require('xlsx');
const nodemailer = require('nodemailer');
const vendorModel = require('./models/vendorModel');

const emailUtils=require('./utils/emailerUtils')

// Function to read Excel and add users to DB
const readExcelAndAddUsers = async () => {
  try {
    // Read the Excel file
    const workbook = XLSX.readFile('/home/mohan/Downloads/vendor.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const users = XLSX.utils.sheet_to_json(worksheet);

    let emailUrl="./emailtemplates/confirmEmail.html"

    for(let user of users)
    {
        let vendor={};
        vendor.user_name=user.vendor+"@AGC.com";  //vendorCode+AGC.com
        vendor.vendor_code=user.Vendor;//change to vendor code
        vendor.commercial_reg_type=user.Commercial
        vendor.company_name_eng=user.Name;
        vendor.contact_email=user?.eMail1 || null;
        vendor.contact_email2=user?.eMail2 || null;
        vendor.password=user.Password

        const result=await vendorModel.create(vendor);
        emailUtils.sendEmail(emailUrl,"confirmation",result.contact_email,result.dataValues)

        if(result?.contact_email2!=null)
        {
            emailUtils.sendEmail(emailUrl,"confirmation",result.contact_email2,result.dataValues)
        }

        // console.log(result);
    }
    
    // console.log(users)
    console.log('Users added and emails sent successfully.');
  } catch (error) {
    console.error('Error in readExcelAndAddUsers:', error);
  }
};

// // Schedule the cron job
// const job = new cron.CronJob('0 0 * * *', readExcelAndAddUsers); 
// job.start();

readExcelAndAddUsers();
