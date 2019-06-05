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

// POST (C IN CRUD)
server.post('/api/cohorts', async (req, res) => {
    try {
        const [id] = await db('cohorts').insert(req.body); 

        const cohort = await db('cohorts')
        .where({ id })
        .first(); 

        res.status(201).json(cohort); 
    } catch (error) {
        const message = errors[error.errno] || 'We ran into an error :('; 
        res.status(500).json({ message, error }); 
    }
}); 

// STRETCH: Adding a new student
server.post('/api/students', async (req, res) => {
    try {
        const [id] = await db('students').insert
        (req.body); 

        const student = await db('students')
        .where({ id })
        .first(); 

        res.status(201).json(student)
    } catch (error) {
        const message = errors[error.errno] || "We ran into an error :("; 
        res.status(500).json({ message, error })
    }
})

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
    // get the cohorts from the database 
    try {
        const cohort = await db('cohorts')
        .where({ id: req.params.id })
        .first(); 
        res.status(200).json(cohort); 
    } catch (error) {
        res.status(500).json(error); 
    }
}); 

// STRETCH: Displaying a list of all my students 
server.get("/api/students", async (req, res) => {
    // Get the students from the database
    try {
      const students = await db("students"); // all the records from the table
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json(error);
    }
  });

// STRETCH: Displaying students by id
server.get('/api/students/:id', async (req, res) => {
    // get the students from the database 
    try {
        const student = await db('students')
        .where({ id: req.params.id })
        .first(); 
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json(error); 
    }
})


// Displays all the students within a cohort 
server.get('/api/cohorts/:id/students', async (req, res) => {
    // get the students from the database 
    try {
        const students = await db('students')
        .select()
        .where({ cohort_id: req.params.id })
        res.status(200).json(students); 
    } catch (error) {
        res.status(500).json(error); 
    }
}); 


// PUT (U in crud) 
server.put('/api/cohorts/:id', async (req, res) => {
    try {
        const count = await db('cohorts')
        .where({ id: req.params.id })
        .update(req.body); 

        if (count > 0) {
            const cohort = await db('cohorts')
            .where({ id: req.params.id })
            .first(); 

            res.status(200).json(cohort);
        } else {
            res.status(404).json({ message: "Records not found!" });
        }
    } catch (error) {} 
}); 

// DELETE (D IN CRUD)
server.delete('/api/cohorts/:id', async (req, res) => {
    try {
        const count = await db('cohorts')
        .where({ id: req.params.id})
        .del(); 

        if (count > 0) {
            res.status(204).end(); 
        } else {
            res.status(404).json({ message: "Records not found"})
        }
    } catch (error) {}
}); 

// Telling my server where to listen  
const port = process.env.PORT || 3000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);