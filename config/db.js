// config/db.js
const { Pool } = require('pg');
const pool = new Pool({
database: "osborne_books",
host: 'localhost',
user: "postgres",
password: "Amit@123",
host: "localhost",
port: 5432
});

// pool.connect()
// .then(()=> console.log('db connecte'))
// .catch(err => console.log(err))

module.exports = pool;
