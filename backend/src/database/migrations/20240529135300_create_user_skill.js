/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_skill", function (table) {
    table.increments("id").primary();
    table
      .string("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("level");
    table.string("skill");
    table.integer("years_exp");
    table
      .integer("major_category_id")
      .unsigned()
      .references("id")
      .inTable("major_category")
      .onDelete("CASCADE");
    table.string("city");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
