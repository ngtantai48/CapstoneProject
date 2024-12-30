/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("major_category", function (table) {
      table.increments("id").primary();
      table.specificType("title", "VARCHAR(255)");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .alterTable("crawl_data", function (table) {
      table
        .integer("major_category_id")
        .unsigned()
        .references("id")
        .inTable("major_category")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("major_category")
    .alterTable("crawl_data", function (table) {
      table.dropColumn("major_category_id");
    });
};
