const CrawlDataService = require("../services/CrawlData.service");
const catchAsync = require("../utils/catchAsync");
const { success, successPagination } = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const database = require("../database");
const httpStatus = require("http-status");
const db = database.getDB();

const getDataCrawls = catchAsync(async (req, res) => {
  const page = Number.parseInt(req.query.page) || 1;
  const limit = Number.parseInt(req.query.limit) || 20;

  if (Number.isNaN(page) || page < 1 || Number.isNaN(limit) || limit < 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid query parameters!");
  }

  // Initialize salary_from and salary_to
  let salary_from = null;
  let salary_to = null;

  // Check if salary query parameter is present
  if (req.query.salary) {
    [salary_from, salary_to] = req.query.salary.split("-");
  }

  // Calculate start index for pagination
  const startIndex = (page - 1) * limit;

  // Parameters object
  const params = {
    search: req.query.search ? req.query.search.trim() : "",
    major_category_id: req.query.major_category_id
      ? Number.parseInt(req.query.major_category_id)
      : "None",
    address: req.query.address ? req.query.address : "None",
    salary_from: salary_from ? Number.parseFloat(salary_from) : "None",
    salary_to: salary_to ? Number.parseFloat(salary_to) : "None",
  };

  const rawData = await CrawlDataService.getDataCrawls(
    startIndex,
    limit,
    params
  );
  const data = rawData.result.map((item, index) => {
    const _images =
      item.images && item.images !== "None"
        ? JSON.parse(item.images.replaceAll("None", null).replaceAll("'", '"'))
        : null;
    const images = Array.isArray(_images)
      ? _images.map((item) => {
          return {
            ...item,
            src: item.link || item.src,
          };
        })
      : null;
    return {
      ...item,
      images,
    };
  });
  res
    .status(httpStatus.OK)
    .send(
      successPagination(
        "SUCCESS",
        data,
        httpStatus.OK,
        rawData.total,
        page,
        limit
      )
    );
});

const getAllDataCrawls = catchAsync(async (req, res) => {
  const page = Number.parseInt(req.query.page) || 1;
  const limit = Number.parseInt(req.query.limit) || 20;

  if (Number.isNaN(page) || page < 1 || Number.isNaN(limit) || limit < 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid query parameters!");
  }

  // Initialize salary_from and salary_to
  let salary_from = null;
  let salary_to = null;

  // Check if salary query parameter is present
  if (req.query.salary) {
    [salary_from, salary_to] = req.query.salary.split("-");
  }

  // Calculate start index for pagination
  const startIndex = (page - 1) * limit;

  // Parameters object
  const params = {
    search: req.query.search ? req.query.search.trim() : "",
    major_category_id: req.query.major_category_id
      ? Number.parseInt(req.query.major_category_id)
      : "None",
    address: req.query.address ? req.query.address : "None",
    salary_from: salary_from ? Number.parseFloat(salary_from) : "None",
    salary_to: salary_to ? Number.parseFloat(salary_to) : "None",
  };

  const rawData = await CrawlDataService.getAllDataCrawls(
    startIndex,
    limit,
    params
  );
  const data = rawData.result.map((item, index) => {
    const _images =
      item.images && item.images !== "None"
        ? JSON.parse(item.images.replaceAll("None", null).replaceAll("'", '"'))
        : null;
    const images = Array.isArray(_images)
      ? _images.map((item) => {
          return {
            ...item,
            src: item.link || item.src,
          };
        })
      : null;
    return {
      ...item,
      images,
    };
  });
  res
    .status(httpStatus.OK)
    .send(
      successPagination(
        "SUCCESS",
        data,
        httpStatus.OK,
        rawData.total,
        page,
        limit
      )
    );
});

const getDataCrawlById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = await CrawlDataService.getDataCrawlById(id);
  await CrawlDataService.increaseCountViewById(id);
  data.images =
    data.images && data.images !== "None"
      ? JSON.parse(data.images.replaceAll("None", null).replaceAll("'", '"'))
      : null;
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, "Crawl data not found");
  }

  res.status(httpStatus.OK).send(success("SUCCESS", data, httpStatus.OK));
});

const updateJob = (id, updatedJob) => {
  return db("job_data").where({ id }).update(updatedJob);
};

const getJobByTitle = async () => {
  return await db("job_data")
    .distinct("job_data.job")
    .select("job_data.job")
    .limit(10);
};

const filterJob = async (key1, key2, key3) => {
  let cityKeyword = key3.toLowerCase();

  if (cityKeyword === "hồ chí minh") {
    cityKeyword = "hồ chí minh";
  } else if (
    cityKeyword === "tphcm" ||
    cityKeyword === "tp.hcm" ||
    cityKeyword === "hcm"
  ) {
    cityKeyword = "hồ chí minh";
  }
  console.log(cityKeyword);
  return await db("job_data").whereRaw(
    "LOWER(Title) like ?  AND LOWER(job) like ? AND (LOWER(City) like ? )",
    [
      `%${key1}%`,
      `%${key2}%`,
      `%${cityKeyword}%`,
      // `%tphcm%`,
      // `%hcm%`,
    ]
  );
};

const searchJob = async (search) => {
  return await db("job_data").whereRaw(
    "LOWER(title) like ?  OR LOWER(job) like",
    [`%${search}%`, `%${search}%`]
  );
};

const queryJob = async ({ search, major, city }) => {};

const updateStatusPost = catchAsync(async (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  await CrawlDataService.updateStatusPostById(id, status);
  res.status(200).send("OK");
});

module.exports = {
  getDataCrawls,
  getDataCrawlById,
  updateJob,
  getJobByTitle,
  filterJob,
  updateStatusPost,
  getAllDataCrawls,
};
