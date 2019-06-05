// Requiring all my dependencies 
const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

// Configuring knex 
const knexConfig = {
    client: 'sqlite3',
    connection: {
      filename: './data/rolex.db3',
    },
    useNullAsDefault: true, // needed for sqlite
  };

const db = knex(knexConfig);
  
const server = express();

server.use(helmet());
server.use(express.json());

// Setting up my server 
const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);