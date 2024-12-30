const config = require("../config");
const moment = require("moment");
const verificationEmailTemplate = (username, url) => {
  return `
  <div style="padding: 5px; font-family: Arial, Helvetica, sans-serif;  border-radius:5px">
    <div>
      <h2 style="font-weight: 900">Verify your email</h2>
      <div style="color: #08121d">
        <p>Dear <b>${username}</b>,</p>
        <p>
          Use the link below to verify your email and start enjoying
					<span style="font-weight: 900">${config.APP_NAME}</span>
					.
        </p>
        <p>Thank you very much !</p>
        <a href="${url}" style="display: flex; justify-content: center; align-items: center; color:white; text-decoration:none; padding:5px 10px; width: 120px; height:25px; background:#1338BE; border-radius:8px; cursor:pointer; font-weight: 600; letter-spacing: 2px" >
          Verify
        </a>
        <p>This verification link will expire in 10 minutes.</p>
        <p>
          Question ? Email us at <span style="color: #1338BE">${config.SMTP_MAIL}</span>
        </p>
      </div>
    </div>
  </div>
`;
};

const verificationEmailSubscribeTemplate = (mail, url) => {
  return `
  <div style="padding: 5px; font-family: Arial, Helvetica, sans-serif;  border-radius:5px">
    <div>
      <h2 style="font-weight: 900">Verify your email</h2>
      <div style="color: #08121d">
        <p>Dear <b>${mail}</b>,</p>
        <p>
          Use the link below to verify subscribe for notification new job posting in the
					<span style="font-weight: 900">${config.APP_NAME}</span>
					.
        </p>
        <p>Thank you very much !</p>
        <a href="${url}" style="display: flex; justify-content: center; align-items: center; color:white; text-decoration:none; padding:5px 10px; width: 120px; height:25px; background:#1338BE; border-radius:8px; cursor:pointer; font-weight: 600; letter-spacing: 2px" >
          Verify
        </a>
        <p>This verification link will expire in 10 minutes.</p>
        <p>
          Question ? Email us at <span style="color: #1338BE">${config.SMTP_MAIL}</span>
        </p>
      </div>
    </div>
  </div>
`;
};

const resetPasswordEmailTemplate = (username, url) => {
  return `
  <div style="padding: 5px; font-family: Arial, Helvetica, sans-serif;  border-radius:5px">
    <div>
      <h2 style="font-weight: 900">Reset password</h2>
      <div style="color: #08121d">
        <p>Dear <b>${username}</b>,</p>
        <p>
          Use the link below to reset your password and start enjoying Carrer connect.
        </p>
        <p>Thank you very much !</p>
        <a href="${url}" style="display: flex; justify-content: center; align-items: center; color:white; text-decoration:none; padding:5px 10px; width: 160px; height:25px; background:#1338BE; border-radius:8px; cursor:pointer; font-weight: 600; letter-spacing: 2px" >
          Reset password
        </a>
        <p>This reset password link will expire in 10 minutes.</p>
        <p>
          Question ? Email us at <span style="color: #1338BE">feedback@socialite.com</span>
        </p>
      </div>
    </div>
  </div>
`;
};

const forgotPassWordEmailTemplate = (username, url) => {
  return `
  <div style="padding: 5px; font-family: Arial, Helvetica, sans-serif;  border-radius:5px">
    <div>
      <h2 style="font-weight: 900">Verify your email</h2>
      <div style="color: #08121d">
        <p>Dear <b>${username}</b>,</p>
        <p>
          Use the link below to verify your email and start enjoying
					<span style="font-weight: 900">${config.APP_NAME}</span>
					.
        </p>
        <p>Thank you very much !</p>
        <a href="${url}" style="display: flex; justify-content: center; align-items: center; color:white; text-decoration:none; padding:5px 10px; width: 120px; height:25px; background:#1338BE; border-radius:8px; cursor:pointer; font-weight: 600; letter-spacing: 2px" >
          Verify
        </a>
        <p>This verification link will expire in 10 minutes.</p>
        <p>
          Question ? Email us at <span style="color: #1338BE">${config.SMTP_MAIL}</span>
        </p>
      </div>
    </div>
  </div>
`;
};

const testMailTemplate = `
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #333;">Dear Thanh MO 11,</h2>
    <div style="margin-top: 20px;">
      <p style="color: #333;">We hope this email finds you well.</p>
      <p style="color: #333;">
        You are cordially invited to attend a meeting at our office. Details of
        the meeting are as follows:
      </p>
      <ul style="list-style-type: none; padding: 0;">
        <li style="color: #333;">
          <strong>Meeting Title:</strong> Thanh conference
        </li>
        <li style="color: #333;">
          <strong>Date:</strong> 2024/06/12
        </li>
        <li style="color: #333;">
          <strong>Time:</strong> 02:00
        </li>
        <li style="color: #333;">
          <strong>Location:</strong> CONFERENCE_ROOM
        </li>
      </ul>
      <p style="color: #333;">
        Your presence and input are highly valued. We look forward to your
        participation in the discussion and collaboration towards our shared
        goals.
      </p>
      <p style="color: #333;">
        If you have any questions or concerns regarding the meeting, please do
        not hesitate to contact me.
      </p>
      <p style="color: #333;">
        Thank you for your attention, and we anticipate a productive session.
      </p>
    </div>
    <div style="margin-top: 20px;">
      <p style="color: #333;">Best regards,</p>
      <p style="color: #3598db;">Thanh MO 4</p>
    </div>
  </div>
`;

function jobNotificationTemplate(list_job) {
  const date = moment(new Date()).format("YYYY-MM-DD");
  const url = config.HOST_FE;
  const list = list_job.map((item) => {
    const _images =
      item.images && item.images !== "None"
        ? JSON.parse(item.images.replaceAll("None", null).replaceAll("'", '"'))
        : null;
    const image =
      _images[0]?.src ||
      "https://res.cloudinary.com/vth20/image/upload/fl_preserve_transparency/v1718646742/ftuitckffex0mcwdcfow.jpg?_s=public-apps";

    return `<div style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden; width: 800px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);display: flex;">
    <div style="position:relative;display: flex;justify-content: center;align-items: center;padding: 12px;margin-top: 6px;">
        <a href="${
          config.HOST_FE + "/post/" + item.id
        }" target="_blank" rel="noreferrer" title="${item.title}">
            <img src="${image}" style="width: 95px; height: auto; display: block;">
        </a>
    </div>
    <div style="padding: 16px;">
        <div style="font-size: 16px; font-weight: bold; margin-bottom: 8px;">
            <a href="${
              config.HOST_FE + "/post/" + item.id
            }" target="_blank" rel="noreferrer" title="${
      item.title
    }" style="color: #333; text-decoration: none;">
                ${item.title}
            </a>
        </div>
        <div style="margin-bottom: 8px;">
            <a href="${
              config.HOST_FE + "/post/" + item.id
            }" target="_blank" rel="noreferrer" style="color: #007bff; text-decoration: none;">
                ${item.company}
            </a>
        </div>
        <div style="color: #555; margin-bottom: 8px;">
            <em class="fa fa-usd" style="margin-right: 4px;"></em>Lương: ${
              item.salary
            }
        </div>
        <div style="color: #555;">
            <em class="mdi mdi-map-marker" style="margin-right: 4px;"></em>${
              item.city
            }
        </div>
    </div>
</div>
`;
  });
  return `<div style="padding: 5px; font-family: Arial, Helvetica, sans-serif;  border-radius:5px">
    <div>
      <h2 style="font-weight: 900">New job posting in the Career connect</h2>
      <div style="color: #08121d">
        <p>
          Hello,
					<span style="font-weight: 900">${config.APP_NAME}</span>
          would like to send you the latest jobs today ${date}
					.
        </p>
        ${list.join("")}
        <p>Thank you very much !</p>
        <a href="${url}" style="display: flex; justify-content: center; align-items: center; color:white; text-decoration:none; padding:5px 10px; width: 200px; height:25px; background:#1338BE; border-radius:8px; cursor:pointer; font-weight: 600; letter-spacing: 2px" >
          See more jobs here
        </a>
        <p>
          Question ? Email us at <span style="color: #1338BE">career-connect.sp@gmail.com</span>
        </p>
      </div>
    </div>
  </div>`;
}

module.exports = {
  verificationEmailTemplate,
  verificationEmailSubscribeTemplate,
  testMailTemplate,
  resetPasswordEmailTemplate,
  jobNotificationTemplate,
};
