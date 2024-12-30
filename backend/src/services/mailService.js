const nodemailer = require("nodemailer");
const config = require('../config')
const sendEmail = async ({ emailFrom, emailTo, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    auth: {
      user: config.SMTP_USERNAME,
      pass: config.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: emailFrom,
    to: emailTo,
    subject: subject,
    text: text,
    html: html
  });
};

module.exports = {
  sendEmail,
};
