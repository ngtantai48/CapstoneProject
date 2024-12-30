const knex = require("knex");
const config = require("../config/knex/knexfile");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const mailScheduleService = require("../services/mailSchedule.service");
const { testMailTemplate } = require("../utils/EmailTemplates");
const { DEFAULT_AVATAR, SMTP_MAIL, APP_NAME } = require("../config");
const mailService = require("../services/mailService");
const TokenService = require("../services/token.service");
const { verificationEmailSubscribeTemplate } = require("../utils/EmailTemplates");

async function createMailSchedule(req, res) {
  try {
    // Check valid request
    const mail = req.body.email;
    if (!mail) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Validation failed!" });
    }
    // Check email exist
    const isCheckExist = await mailScheduleService.isCheckEmailExist(mail);
    if (isCheckExist) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Email already exists!" });
    }
    //create record
    const activationToken = TokenService.createMailRegistrationToken({
      email: mail,
    });
    const activationUrl = `${process.env.HOST}/api/v1/mail-schedule/activation/${activationToken}`;
    const mailOptions = {
      emailFrom: SMTP_MAIL,
      emailTo: mail,
      subject: `Welcome to ${APP_NAME} - Please Verify Your Subscribe Email`,
      text: `Click here to verify your account and receive new job posting everyday: ${activationUrl}`,
      html: verificationEmailSubscribeTemplate(mail, activationUrl),
    };

    await mailScheduleService.createMailSchedule(mail, "PENDING");
    await mailService.sendEmail(mailOptions);
    return res.status(201).json({ message: "mail schedule created" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function test(req, res) {
  const template = await mailScheduleService.createJobMailTemplate();
  const mailOptions = {
    emailFrom: SMTP_MAIL,
    emailTo: "vanthanhhuynhtk@gmail.com",
    subject: `Job posting news in the Career connect`,
    text: `Click here to verify your account`,
    html: template,
  };
  try {
    await mailService.sendEmail(mailOptions);
    return res.status(201).json({
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal server error"
    );
  }
}

async function verifyMailSchedule(req, res) {
  try {
    const activation_token = req.params.token;
    const mail_payload =
      TokenService.verifyMailRegistrationToken(activation_token);
      console.log(mail_payload);
    const isVerified = await mailScheduleService.isVerified(mail_payload.email);
    if (isVerified) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Email has been verified before!" });
    }
    //create record
    await mailScheduleService.verifyMailSchedule(mail_payload.email);
    return res.status(201).json({ message: "Thank you for your subscribe" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createMailSchedule,
  verifyMailSchedule,
  test,
};
