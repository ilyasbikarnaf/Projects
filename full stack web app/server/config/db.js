const mysql = require("mysql2/promise");

const mysqlPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

async function createUsersTable() {
  let connection;
  try {
    connection = await mysqlPool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) CHARACTER SET 'utf8mb4' UNIQUE NOT NULL,
    password VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
    type VARCHAR(255) CHARACTER SET 'utf8mb4' NOT NULL,
    active TINYINT DEFAULT 1
);
    `);
  } catch (err) {
    console.error("Error creating users table:", err);
  } finally {
    connection.release();
  }
}

createUsersTable();

module.exports = mysqlPool;
