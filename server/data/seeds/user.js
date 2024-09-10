/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const bcrypt = require('bcryptjs')

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').truncate()
  await knex('users').insert([
    { username: 'Elleanor', password: bcrypt.hashSync('hotfudge' , 8)},
    { username: 'Kirby' , password: bcrypt.hashSync('1234', 8)},
    { username: 'Mel' , password: bcrypt.hashSync ('kirby', 8)}
  ]);
};
