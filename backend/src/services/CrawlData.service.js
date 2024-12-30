const database = require("../database");
const db = database.getDB();

const getDataCrawls = async (startIndex, limit, params) => {
  // Base query to be used for both fetching data and counting total
  let baseQuery = db("crawl_data")
    .select(
      "crawl_data.id",
      "crawl_data.title",
      "crawl_data.time",
      "crawl_data.city",
      "crawl_data.age",
      "crawl_data.sexual",
      "crawl_data.probationTime",
      "crawl_data.workWay",
      "crawl_data.right",
      "crawl_data.company",
      "crawl_data.job",
      "crawl_data.place",
      "crawl_data.numberEmployees",
      "crawl_data.experience",
      "crawl_data.level",
      "crawl_data.salary",
      "crawl_data.education",
      "crawl_data.description",
      "crawl_data.requirements",
      "crawl_data.deadline",
      "crawl_data.images",
      "crawl_data.link",
      "crawl_data.type",
      "crawl_data.contact",
      "crawl_data.status",
      "crawl_data.major_category_id"
    )
    .where(function () {
      this.where("crawl_data.title", "like", `%${params.search}%`)
        .orWhere("crawl_data.job", "like", `%${params.search}%`)
        .orWhere("crawl_data.description", "like", `%${params.search}%`)
        .orWhere("crawl_data.education", "like", `%${params.search}%`)
        .orWhere("crawl_data.experience", "like", `%${params.search}%`)
        .orWhere("crawl_data.place", "like", `%${params.search}%`)
        .andWhere("crawl_data.time", "!=", "None");
    })
    .andWhere(function () {
      this.where("crawl_data.status", "!=", "DELETE").orWhereNull(
        "crawl_data.status"
      );
    })
    .orderBy("crawl_data.time", "desc");

  // Handle major category
  if (params.major_category_id !== "None") {
    baseQuery = baseQuery.where(
      "crawl_data.major_category_id",
      params.major_category_id
    );
  }

  // Handle address
  if (params.address !== "None") {
    baseQuery = baseQuery.where("crawl_data.city", params.address);
  }

  // Handle salary
  if (params.salary_from !== "None" && params.salary_to !== "None") {
    baseQuery = baseQuery.whereRaw(
      "CAST(crawl_data.salary AS DECIMAL(10, 2)) BETWEEN ? AND ?",
      [params.salary_from, params.salary_to]
    );
  }

  if (params.salary_from !== "None" && params.salary_to == "None") {
    baseQuery = baseQuery.whereRaw(
      "CAST(crawl_data.salary AS DECIMAL(10, 2)) <= ?",
      [params.salary_from]
    );
  }

  // Clone the base query to create a query for counting total records
  const totalQuery = baseQuery
    .clone()
    .clearSelect()
    .count({ total: "*" })
    .first();

  // Add pagination to the base query for fetching data
  const resultQuery = baseQuery.offset(startIndex).limit(limit);

  // Execute both queries
  const [totalResult, result] = await Promise.all([totalQuery, resultQuery]);

  // Extract the total count from the totalResult
  const total = totalResult ? totalResult.total : 0;

  return { total, result };
};

const getAllDataCrawls = async (startIndex, limit, params) => {
  // Base query to be used for both fetching data and counting total
  let baseQuery = db("crawl_data")
    .select(
      "crawl_data.id",
      "crawl_data.title",
      "crawl_data.time",
      "crawl_data.city",
      "crawl_data.age",
      "crawl_data.sexual",
      "crawl_data.probationTime",
      "crawl_data.workWay",
      "crawl_data.right",
      "crawl_data.company",
      "crawl_data.job",
      "crawl_data.place",
      "crawl_data.numberEmployees",
      "crawl_data.experience",
      "crawl_data.level",
      "crawl_data.salary",
      "crawl_data.education",
      "crawl_data.description",
      "crawl_data.requirements",
      "crawl_data.deadline",
      "crawl_data.images",
      "crawl_data.link",
      "crawl_data.type",
      "crawl_data.contact",
      "crawl_data.status",
      "crawl_data.major_category_id"
    )
    .where(function () {
      this.where("crawl_data.title", "like", `%${params.search}%`)
        .orWhere("crawl_data.job", "like", `%${params.search}%`)
        .orWhere("crawl_data.description", "like", `%${params.search}%`)
        .orWhere("crawl_data.education", "like", `%${params.search}%`)
        .orWhere("crawl_data.experience", "like", `%${params.search}%`)
        .orWhere("crawl_data.place", "like", `%${params.search}%`)
        .andWhere("crawl_data.time", "!=", "None");
    })
    .orderBy("crawl_data.time", "desc");

  // Handle major category
  if (params.major_category_id !== "None") {
    baseQuery = baseQuery.where(
      "crawl_data.major_category_id",
      params.major_category_id
    );
  }

  // Handle address
  if (params.address !== "None") {
    baseQuery = baseQuery.where("crawl_data.city", params.address);
  }

  // Handle salary
  if (params.salary_from !== "None" && params.salary_to !== "None") {
    baseQuery = baseQuery.whereRaw(
      "CAST(crawl_data.salary AS DECIMAL(10, 2)) BETWEEN ? AND ?",
      [params.salary_from, params.salary_to]
    );
  }

  if (params.salary_from !== "None" && params.salary_to == "None") {
    baseQuery = baseQuery.whereRaw(
      "CAST(crawl_data.salary AS DECIMAL(10, 2)) <= ?",
      [params.salary_from]
    );
  }

  // Clone the base query to create a query for counting total records
  const totalQuery = baseQuery
    .clone()
    .clearSelect()
    .count({ total: "*" })
    .first();

  // Add pagination to the base query for fetching data
  const resultQuery = baseQuery.offset(startIndex).limit(limit);

  // Execute both queries
  const [totalResult, result] = await Promise.all([totalQuery, resultQuery]);

  // Extract the total count from the totalResult
  const total = totalResult ? totalResult.total : 0;

  return { total, result };
};

const getDataCrawlById = async (id) => {
  return await db("crawl_data").where({ id }).first();
};

const updateStatusPostById = async (id, status) => {
  return await db("crawl_data").where({ id }).update({ status: status });
};

const increaseCountViewById = async (id) => {
  const record = await db("crawl_data").where({ id }).first();
  const newViewCount = record?.view_count + 1;
  await db("crawl_data").where({ id }).update({ view_count: newViewCount });
};

module.exports = {
  getDataCrawls,
  getDataCrawlById,
  updateStatusPostById,
  getAllDataCrawls,
  increaseCountViewById,
};
