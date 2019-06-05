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

// Setting up my server 
const port = process.env.PORT || 3000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);