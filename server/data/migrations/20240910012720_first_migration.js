exports.up = function (knex) {
    return knex.schema.createTable('users', users => {
      users.increments();
      users.string('username', 255).notNullable().unique();
      users.string('password', 255).notNullable();
    })
    .createTable('pets', pets => {
      pets.increments();
      pets.string('img');
      pets.string('petname', 255).notNullable();
      pets.string('breed', 50).notNullable();
      pets.integer('weight', 5).notNullable();
      pets.string('color' , 255).notNullable();
      pets.string('bio').notNullable();
    })
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('pets')
      .dropTableIfExists('users')
  };
  