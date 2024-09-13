exports.up = function (knex) {
    return knex.schema.createTable('users', users => {
      users.increments();
      users.string('username', 255).notNullable().unique();
      users.string('password', 255).notNullable();
    })
    .createTable('pets', pets => {
      pets.increments('pet_id');
      pets.string('img');
      pets.string('petname', 255).notNullable();
      pets.string('breed', 50).notNullable();
      pets.integer('weight', 5).notNullable();
      pets.string('color' , 255).notNullable();
      pets.string('bio').notNullable();
    })
    .createTable('comments', comments => {
      comments.increments()
      comments.integer('pet_id')
        .unsigned()
        .notNullable()
        .references('pet_id')
        .inTable('pets')
        .onDelete('CASCADE')
      comments.string('comment', 255)
      comments.timestamp('created_at').defaultTo(knex.fn.now())
    })
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('comments')
      .dropTableIfExists('pets')
      .dropTableIfExists('users')
  };
  