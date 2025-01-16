// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> } 
//  */

// const bcrypt = require('bcryptjs')

// exports.seed = async function(knex) {
//   // Deletes ALL existing entries
//   await knex('users').truncate()
//   await knex('users').insert([
//     { email: 'ellepetshop@gmail.com', username: 'Elleanor', password: bcrypt.hashSync('hotfudge22' , 8)},
//     { email: 'k.money@hotmail.com', username: 'Kirby' , password: bcrypt.hashSync('hello1234', 8)},
//     { email: 'mel@prodigy.net', username: 'Mel' , password: bcrypt.hashSync ('kirby04', 8)},
//     { email: 'test@gmail.com', username: 'test' , password: bcrypt.hashSync('helloworld01', 8)},
//   ]);
// };


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const bcrypt = require('bcryptjs');

exports.seed = async function (knex) {
  // Clear existing entries
  await knex('users').del();

  // Insert seed data
  await knex('users').insert([
    {
      email: 'ellepetshop@gmail.com',
      username: 'Elleanor',
      password: bcrypt.hashSync('hotfudge22', 8),
    },
    {
      email: 'k.money@hotmail.com',
      username: 'Kirby',
      password: bcrypt.hashSync('hello1234', 8),
    },
    {
      email: 'mel@prodigy.net',
      username: 'Mel',
      password: bcrypt.hashSync('kirby04', 8),
    },
    {
      email: 'test@gmail.com',
      username: 'test',
      password: bcrypt.hashSync('helloworld01', 8),
    },
  ]);
};

