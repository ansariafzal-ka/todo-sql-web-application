const sqlite3 = require("sqlite3").verbose();
const dbName = "todo.db";

let db = new sqlite3.Database(dbName, (error) => {
  if (error) {
    console.error(error.message);
  } else {
    console.log("Connected to SQL Database");
    db.run(
      "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT)",
      (error) => {
        if (error) {
          console.error(error.message);
        } else {
          console.log("Table created or existed");
        }
      }
    );
  }
});

module.exports = db;
