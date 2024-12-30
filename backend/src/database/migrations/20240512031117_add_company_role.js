/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("users", function (table) {
		table.specificType("follower", "MEDIUMTEXT"); // store user follow company
		table.specificType("following", "MEDIUMTEXT"); // store user is flowing company
  })
	.alterTable("post_data", function (table) {
		table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("post_data")
        .onDelete("CASCADE");
  });;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
