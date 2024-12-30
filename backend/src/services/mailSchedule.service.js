const database = require("../database");
const db = database.getDB();
const { jobNotificationTemplate } = require("../utils/EmailTemplates");

async function getAllMailSchedule() {
  return await db("mail_schedule")
    .select("mail_schedule.email")
    .orderBy("mail_schedule.id", "asc");
}

async function createMailSchedule(mail, status) {
  return await db("mail_schedule").insert({ email: mail, status: status });
}

async function verifyMailSchedule(mail) {
  console.log(mail);
  return await db("mail_schedule")
    .where({ email: mail })
    .update({ status: "ACTIVE" });
}

async function isCheckEmailExist(mail) {
  return await db("mail_schedule")
    .where({ email: mail, status: "ACTIVE" })
    .first();
}

async function isVerified(mail) {
  return await db("mail_schedule")
    .where({ email: mail, status: "ACTIVE" })
    .first();
}

async function createJobMailTemplate() {
  const jobs = await db("crawl_data")
    .limit(10)
    .orderBy("time", "desc");
  return jobNotificationTemplate(jobs);
}

module.exports = {
  getAllMailSchedule,
  createMailSchedule,
  isCheckEmailExist,
  verifyMailSchedule,
  isVerified,
  createJobMailTemplate,
};
