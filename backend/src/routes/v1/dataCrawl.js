const express = require("express");
const router = express.Router();
const CrawlController = require("../../controllers/crawlController");
const catchAsync = require("../../utils/catchAsync");
// const bodyParser = require("body-parser");
// router.use(bodyParser.json());

router.get("/", CrawlController.getDataCrawls);

router.get("/admin", CrawlController.getAllDataCrawls);

router.get("/:id", CrawlController.getDataCrawlById);

router.put("/updatejob/:id", async (req, res) => {
  const updatedUser = req.body;
  try {
    const job_id = req.params.id;
    const job = await CrawlController.getDataCrawlById(job_id);
    if (job) {
      await CrawlController.updateJob(job_id, updatedUser);
      const job = await CrawlController.getDataCrawlById(job_id);
      res.json({
        message: "Job updated",
        data: job,
      });
    } else {
      res.status(404).json({ error: "Job not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/jobtitle", async (req, res) => {
  try {
    const data = await CrawlController.getJobByTitle();
    res.json({
      message: "Job Title",
      data: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/filterjob", async (req, res) => {
  const key1 = req.query.key1 || "";
  const key2 = req.query.key2 || "";
  const key3 = req.query.key3 || "";
  try {
    const data = await CrawlController.filterJob(key1, key2, key3);
    console.log("key1 = :", key1, "key2 = :", key2, "key3 = :", key3);
    res.json({
      message: "Job Title",
      data: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/status/:id", CrawlController.updateStatusPost);

module.exports = router;
