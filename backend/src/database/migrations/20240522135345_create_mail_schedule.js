/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("mail_schedule", function (table) {
            table.increments("id").primary();
            table.specificType("email", "MEDIUMTEXT");
            table.string("status", 30);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

};
