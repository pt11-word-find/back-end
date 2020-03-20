
exports.up = function(knex) {
  return knex.schema.createTable('wordlists', boards => {
    boards.increments();
    boards.string('wordlist', 2048)
      .notNullable()
    boards.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('wordlists')
};
