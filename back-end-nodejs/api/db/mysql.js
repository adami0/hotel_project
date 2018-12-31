'use strict';
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'  // this line just for mac users
});

connection.connect();

// dummy function pour vérifier si la connectione à la base est bien établie
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('DATABASE SAYS => The solution is', results[0].solution);
});

module.exports = connection;
