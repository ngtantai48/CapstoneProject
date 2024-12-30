/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_cv", function (table) {
    table.increments("id").primary();
    table.specificType("title", "MEDIUMTEXT");
    table.specificType("link", "MEDIUMTEXT");
    table.string("status", 10); // enum('ACTIVE', 'INACTIVE')
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
