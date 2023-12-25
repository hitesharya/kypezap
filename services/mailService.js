const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
require("dotenv").config();

exports.sendMail = async (to, body) => {
  return new Promise((resolve, reject) => {
    try {
      const msg = {
        to: to, // Change to your recipient
        from: process.env.SG_EMAIL, // Change to your verified sender
        subject: "Verification Email Address",
        html: body,
      };
      sgMail
        .send(msg)
        .then((result) => {
          console.log(result);
          resolve({
            status: 200,
            code: "Success",
            message: "EMAIL SENT SUCCESSFULLY",
          });
        })
        .catch((error) => {
          console.log(error);
          reject({
            status: 500,
            code: "Failed",
            message: error,
          });
        });
    } catch (error) {
      reject({
        status: 500,
        code: "Failed",
        message: error.message,
      });
    }
  });
};
