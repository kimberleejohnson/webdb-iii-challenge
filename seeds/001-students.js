
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, name: 'Cori', cohort_id: '1'},
        {id: 2, name: 'Jeremy', cohort_id:'1'},
        {id: 3, name: 'Leo', cohort_id: '1'}
      ]);
    });
};