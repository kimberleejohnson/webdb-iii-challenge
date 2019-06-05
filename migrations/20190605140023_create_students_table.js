// New changes to the database scheme 
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(tbl) {

    // priority key called id, autoincrements, integer
    tbl.increments(); 

    // varchar called name 128 characters long, unique, not null 
    tbl.string('name', 128).notNullable().unique(); 

    // foreign key that references id 
    tbl.integer('cohort_id').unsigned().references('id').inTable('cohorts').onDelete('CASCADE').onUpdate('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('roles');
};
