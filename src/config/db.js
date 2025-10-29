import mysql from "mysql2/promise";

// ============================
//  Conexão com o MariaDB
// ============================


export const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "biblioteca",
  port: 3306,
});

console.log("✅ Conectado ao banco de dados biblioteca!");