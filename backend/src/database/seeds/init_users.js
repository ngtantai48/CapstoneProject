/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: "admin_id", name: 'admin', email: 'admin-carreerconnect@yopmail.com', password: 'b87fa0a0a8393ee01e433011d14fe6e732c7ad90ae9ac140117e8c2b8e26a46ba297eed9d2661d22f5afde22c43f511f06fde11c01919ce7c753b47fdf6d1a6d', 'role': 'admin', 'isVerified': 1},
    {id: "company_id", name: 'BAP JSC .CO', email: 'bap-sofware@yopmail.com', password: 'b87fa0a0a8393ee01e433011d14fe6e732c7ad90ae9ac140117e8c2b8e26a46ba297eed9d2661d22f5afde22c43f511f06fde11c01919ce7c753b47fdf6d1a6d', 'role': 'company', 'isVerified': 1},
    {id: "user_id", name: 'user', email: 'user-carreerconnect@yopmail.com', password: 'b87fa0a0a8393ee01e433011d14fe6e732c7ad90ae9ac140117e8c2b8e26a46ba297eed9d2661d22f5afde22c43f511f06fde11c01919ce7c753b47fdf6d1a6d', 'role': 'user', 'isVerified': 1},
  ]);
};
