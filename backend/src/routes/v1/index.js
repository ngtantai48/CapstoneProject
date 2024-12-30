const dataCrawlRouter = require("./dataCrawl");
const authRouter = require("./auth");
const userRouter = require("./users");
const mailScheduleRouter = require("./mailSchedule.route")
const analyzeRouter = require("./analyze.route")
const express = require("express");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/crawl",
    route: dataCrawlRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/mail-schedule",
    route: mailScheduleRouter,
  },
  {
    path: "/analyze",
    route: analyzeRouter,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
