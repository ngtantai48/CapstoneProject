const cron = require("node-cron");
const mailService = require("../services/mailService");
const mailScheduleService = require("../services/mailSchedule.service")
const { SMTP_MAIL } = require("../config");

const sendMail = async () => {
    try {
      const template = await mailScheduleService.createJobMailTemplate();
      const mailOptions = {
        emailFrom: SMTP_MAIL,
        subject: `Job posting news in the Career connect`,
        text: `Click here to verify your account`,
        html: template,
      };
      try {
        const listMailSchedule = await mailScheduleService.getAllMailSchedule();
        for (const oItem of listMailSchedule) {
          mailOptions.emailTo = oItem.email
          await mailService.sendEmail(mailOptions);
          console.log("Email sent successfully");
        }

      } catch (error) {
        console.log("Failed to send email" || "Internal server error");
      }
    } catch (error) {
      console.log(error);
    }
};

const cronJob = cron.schedule('0 7 * * *', () => {
    sendMail();
    console.log('running a task every day');
});

module.exports = { cronJob, sendMail };