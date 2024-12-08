/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const bcrypt = require('bcryptjs')

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').truncate()
  await knex('users').insert([
    { username: 'Elleanor', password: bcrypt.hashSync('hotfudge22' , 8)},
    { username: 'Kirby' , password: bcrypt.hashSync('hello1234', 8)},
    { username: 'Mel' , password: bcrypt.hashSync ('kirby04', 8)},
    { username: 'test' , password: bcrypt.hashSync('helloworld01')},
  ]);
};
