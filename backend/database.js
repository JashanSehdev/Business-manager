import mysql from 'mysql2/promise';

// create a connection pool (recommended)
const pool = mysql.createPool({
  host: 'localhost',      // or IP/URL of your DB
  user: 'root',           // your MySQL username
  password: '7852',// your MySQL password
  database: 'business_manager',      // your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});



export default pool;