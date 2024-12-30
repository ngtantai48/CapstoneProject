const database = require("../database");
const db = database.getDB();

async function getUserAnalyze() {
  const result = await db("users")
    .select(db.raw("COUNT(*) as total"))
    .select(db.raw("substring(created_at, 1, 7) as month"))
    .groupBy(db.raw("substring(created_at, 1, 7)"))
    .orderBy("month");

  return result;
}

async function getCrawlAnalyze() {
  const result = await db("crawl_data")
    .select(db.raw("COUNT(*) as total"))
    .select(db.raw("substring(created_at, 1, 7) as month"))
    .groupBy(db.raw("substring(created_at, 1, 7)"))
    .orderBy("month");

  return result;
}
module.exports = { getUserAnalyze, getCrawlAnalyze };
