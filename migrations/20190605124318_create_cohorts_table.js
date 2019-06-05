// New changes to the database schema
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cohorts', function(tbl) {
        //priority key called id, autoincrements, integer
        tbl.increments(); 


        // varchar called name 128 characters long, unique, not null 
        tbl.string('name', 128).notNullable().unique(); 
    })
};

// How to undo the changes to the schema if we need 
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cohorts'); 
};
