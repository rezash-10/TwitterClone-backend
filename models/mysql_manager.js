const mysql = require("mysql")
const dotenv = require('dotenv')
const authenticationQueries = require('./authentication-queries')
//********************************************/
dotenv.config({ path: './.env'})
const databaseName = process.env.DATABASE

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: databaseName,
    connectionLimit: 10,
  });



//********************************************/

module.exports = pool;

//********************************************/

