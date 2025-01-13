const express = require("express");
const router = express.Router();
const AnalyzeController = require("../../controllers/analyze.controller");
// const bodyParser = require("body-parser");
// router.use(bodyParser.json());

router.get("/user", AnalyzeController.analyzeUser);
router.get("/crawl", AnalyzeController.analyzeCrawl);

module.exports = router;