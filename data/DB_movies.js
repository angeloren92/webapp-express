const sql = require('mssql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost:3006',
  user: process.env.DB_USER || 'root1',
  password: process.env.DB_PASSWORD || 'secretpassword',
  database: process.env.DB_NAME || 'movies_DB',
  port: process.env.DB_PORT || 3010
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

module.exports = connection;