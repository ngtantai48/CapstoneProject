const catchAsync = require("../utils/catchAsync");
const AnalyzeService = require("../services/analyze.service");

const analyzeUser = catchAsync(async (req, res) => {
  const analyzeUser = await AnalyzeService.getUserAnalyze();
  res.status(200).send(analyzeUser);
});

const analyzeCrawl = catchAsync(async (req, res) => {
  const analyzeUser = await AnalyzeService.getCrawlAnalyze();
  res.status(200).send(analyzeUser);
});

module.exports = { analyzeUser, analyzeCrawl };
