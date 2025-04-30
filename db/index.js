import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'abacaxi123+-*',
  database: 'app_users'
});

export default connection;