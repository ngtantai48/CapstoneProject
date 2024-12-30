const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DBNAME } = require("../index");

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: MYSQL_HOST || "localhost",
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DBNAME,
      port: "3306",
    },
    migrations: {
      directory: "../../database/migrations",
    },
    seeds: {
      directory: "../../database/seeds",
    },
  },
};
