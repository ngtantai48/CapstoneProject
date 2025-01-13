require("dotenv").config();

const config = {
  env: "development",
  DEFAULT_AVATAR:
    "https://res.cloudinary.com/vth20/image/upload/fl_preserve_transparency/v1658138187/dbhvs4ankmsdsdhkszlp.jpg?_s=public-apps",
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USERNAME: process.env.SMTP_USERNAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  ACTIVATION_SECRET: process.env.ACTIVATION_SECRET,
  SECRET_REFRESH: process.env.SECRET_REFRESH,
  SECRET: process.env.SECRET,
  APP_NAME: process.env.APP_NAME,
  SMTP_MAIL: process.env.SMTP_MAIL,
  MAIL_OWNER: process.env.MAIL_OWNER,
  MAIL_TEST: process.env.MAIL_TEST,
  MYSQL_HOST: process.env.HOST,
  MYSQL_USER: process.env.USER,
  MYSQL_PASSWORD: process.env.PASSWORD,
  MYSQL_DBNAME: process.env.DBNAME,
  HOST_FE: process.env.HOST_FE,
};

module.exports = config;
