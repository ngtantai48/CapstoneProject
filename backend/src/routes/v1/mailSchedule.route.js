const express = require("express");
const router = express.Router();
const mailScheduleController = require("../../controllers/mailSchedule.Controller");
const { sendMail } = require("../../schedule");

// create email schedule
router.post("/", mailScheduleController.createMailSchedule);
router.get("/activation/:token", mailScheduleController.verifyMailSchedule);
router.get("/test", mailScheduleController.test);
router.get("/trigger", (req, res) => {
  try {
    sendMail();
    res.status(200).json({ message: "Send mail successful" });
  } catch (error) {
    res.status(400).json({ message: "Send mail error" });
  }
});
module.exports = router;
