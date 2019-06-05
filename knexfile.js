// Update with your config settings, moved over from index.js
// Keeping only development requirements for today's 

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/lambda.db3',
    },
    useNullAsDefault: true, // needed for sqlite
  },
};
