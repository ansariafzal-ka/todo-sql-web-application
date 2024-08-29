const db = require("../config/database.config");

const todoControllers = {
  GET: (request, response) => {
    const sql = `SELECT * FROM tasks`;
    db.all(sql, [], (error, rows) => {
      if (error) {
        return response.status(500).json({ error: "Error fetching all tasks" });
      }
      response.render("index", { tasks: rows });
    });
  },
  POST: (request, response) => {
    const { task } = request.body;
    if (!task) {
      return response.status(400).json({ Error: "Some Fields are missing" });
    }

    const sql = `INSERT INTO tasks (task) VALUES (?)`;
    db.run(sql, [task], function (error) {
      if (error) {
        return response.status(500).json({ error: "Failed to add task" });
      }
      response.redirect("/");
    });
  },
  DELETE: (request, response) => {
    const { id } = request.params;
    const sql = `DELETE FROM tasks WHERE id = ?`;
    db.run(sql, [id], (error) => {
      if (error) {
        return response
          .status(500)
          .json({ error: "Failed to delete this task" });
      }
      if (this.changes === 0) {
        return response
          .status(404)
          .json({ message: "No task found with the given id" });
      }
      response.redirect("/");
    });
  },
};

module.exports = todoControllers;
