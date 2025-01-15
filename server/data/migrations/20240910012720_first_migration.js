// exports.up = function (knex) {
//     return knex.schema.createTable('users', users => {
//       users.increments();
//       users.string('username').notNullable().unique();
//       users.string('password').notNullable();
//       users.string('email').notNullable().unique();
//     })
//     .createTable('pets', pets => {
//       pets.increments('pet_id');
//       pets.string('img');
//       pets.string('petname').notNullable();
//       pets.string('breed').notNullable();
//       pets.integer('weight').notNullable();
//       pets.string('color').notNullable();
//       pets.string('bio').notNullable();
//     })
//     .createTable('comments', comments => {
//       comments.increments()
//       comments.integer('pet_id')
//         .unsigned()
//         .notNullable()
//         .references('pet_id')
//         .inTable('pets')
//         .onDelete('CASCADE')
//       comments.string('comment', 255)
//       comments.timestamp('created_at').defaultTo(knex.fn.now())
//       comments.string('username')
//         .notNullable()
//         .references('username')
//         .inTable('users')
//         .onDelete('CASCADE')
//     })
//     .createTable('likes', likes => {
//       likes.boolean('like').defaultTo(false)
//       likes.integer('pet_id')
//         .unsigned()
//         .notNullable()
//         .references('pet_id')
//         .inTable('pets')
//         .onDelete('CASCADE')
//       likes.string('username')
//         .notNullable()
//         .references('username')
//         .inTable('users')
//         .onDelete('CASCADE')
//       likes.primary(['pet_id', 'username'])
//     })
//   };
  
//   exports.down = function (knex) {
//     return knex.schema.dropTableIfExists('likes')
//       .dropTableIfExists('comments')
//       .dropTableIfExists('pets')
//       .dropTableIfExists('users')
//   };


exports.up = function (knex) {
  return knex.schema
    .createTable('users', (users) => {
      users.increments();
      users.string('username').notNullable().unique();
      users.string('password').notNullable();
      users.string('email').notNullable().unique();
      users.timestamps(true, true); // Adding created_at and updated_at
    })
    .createTable('pets', (pets) => {
      pets.increments('pet_id');
      pets.string('img').defaultTo('default_image_url'); // Default image URL
      pets.string('petname').notNullable();
      pets.string('breed').notNullable();
      pets.integer('weight').notNullable();
      pets.string('color').notNullable();
      pets.string('bio').notNullable();
      pets.timestamps(true, true); // Adding created_at and updated_at
    })
    .createTable('comments', (comments) => {
      comments.increments();
      comments.integer('pet_id')
        .unsigned()
        .notNullable()
        .references('pet_id')
        .inTable('pets')
        .onDelete('CASCADE');
      comments.string('comment', 255);
      comments.timestamp('created_at').defaultTo(knex.fn.now());
      comments.string('username')
        .notNullable()
        .references('username')
        .inTable('users')
        .onDelete('CASCADE');
    })
    .createTable('likes', (likes) => {
      likes.boolean('like').defaultTo(false);
      likes.integer('pet_id')
        .unsigned()
        .notNullable()
        .references('pet_id')
        .inTable('pets')
        .onDelete('CASCADE');
      likes.string('username')
        .notNullable()
        .references('username')
        .inTable('users')
        .onDelete('CASCADE');
      likes.primary(['pet_id', 'username']);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('likes')
    .dropTableIfExists('comments')
    .dropTableIfExists('pets')
    .dropTableIfExists('users');
};
