const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ndeng@123", 
  database: "livres_db"
});

db.connect(err => {
  if (err) {
    console.log("Erreur DB :", err);
  } else {
    console.log("Connecté à MySQL");
  }
});

module.exports = db;