/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('pets').truncate()
  await knex('pets').insert([
    {petname: "fluffy" , breed: "Pitbull" , weight: 57, color: "brown", bio: "Fluffy is a sweet girl with a spunky personality. Loves to go on hikes and long walks on the beach."},
  ]);
};
