/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, username: 'Elleanor', password: 'hotfudge'},
    {id: 2, username: 'Kirby' , password: 1234 },
    {id: 3, username: 'Mel' , password: 'kirby'}
  ]);
};
