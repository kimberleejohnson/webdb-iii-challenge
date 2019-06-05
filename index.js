// Requiring all my dependencies 
const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

// After creating knex file with npx knex init, calling in that file here
const knexConfig = require('./knexfile.js'); 

// Calling the development aspect of our knex file 
const db = knex(knexConfig.development);

// Defining my server 
const server = express();

server.use(helmet());
server.use(express.json());

// ROUTES 

// GET (R in CRUD)
server.get("/api/cohorts", async (req, res) => {
  // Get the cohorts from the database
  try {
    const cohorts = await db("cohorts"); // all the records from the table
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get('/api/cohorts/:id', async (req, res) => {
    // get the roles from the database 
    try {
        const cohort = await db('cohorts')
        .where({ id: req.params.id })
        .first(); 
        res.status(200).json(cohort); 
    } catch (error) {
        res.status(500).json(error); 
    }
}); 

// Telling my server where to listen  
const port = process.env.PORT || 3000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);