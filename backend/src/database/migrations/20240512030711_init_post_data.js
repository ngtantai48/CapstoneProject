/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("post_data", function (table) {
      table.increments("id").primary();
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
        .uuid("crawl_data_id")
        .references("id")
        .inTable("crawl_data")
        .onDelete("CASCADE");
      table
        .enum("type", ["facebook", "linkedin", "topdev", "itviec", "post"])
        .notNullable();
      table.specificType("contact", "MEDIUMTEXT");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
