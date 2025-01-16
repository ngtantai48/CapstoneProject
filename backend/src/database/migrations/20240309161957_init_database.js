/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.string("id").primary();
      table.string("name");
      table.string("email");
      table.string("password");
      table.string("role");
      table.string("avatar").defaultTo("avatar");
      table.string("background").defaultTo("background");
      table.integer("age");
      table.date("birthday");
      table.boolean("isVerified").defaultTo(false);
      table.boolean("isTwoFactor").defaultTo(false);
      table.boolean("smsCode");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("crawl_data", function (table) {
      table.uuid("id").primary();
      table.specificType("title", "MEDIUMTEXT");
      table.specificType("time", "MEDIUMTEXT");
      table.specificType("city", "MEDIUMTEXT");
      table.specificType("age", "MEDIUMTEXT");
      table.specificType("sexual", "MEDIUMTEXT");
      table.specificType("probationTime", "MEDIUMTEXT");
      table.specificType("workWay", "MEDIUMTEXT");
      table.specificType("right", "MEDIUMTEXT");
      table.specificType("company", "MEDIUMTEXT");
      table.specificType("job", "MEDIUMTEXT");
      table.specificType("place", "MEDIUMTEXT");
      table.string("numberEmployees");
      table.specificType("experience", "MEDIUMTEXT");
      table.specificType("level", "MEDIUMTEXT");
      table.specificType("salary", "MEDIUMTEXT");
      table.specificType("education", "MEDIUMTEXT");
      table.specificType("description", "MEDIUMTEXT");
      table.specificType("requirements", "MEDIUMTEXT");
      table.specificType("deadline", "MEDIUMTEXT");
      table.specificType("images", "MEDIUMTEXT");
      table.specificType("link", "MEDIUMTEXT");
      table
        .enum("type", ["facebook", "linkedin", "topdev", "itviec"])
        .notNullable();
      table.specificType("contact", "MEDIUMTEXT");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users").dropTable("crawl_data");
};
