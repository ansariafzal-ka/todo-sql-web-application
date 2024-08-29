const db = require("../config/database.config");

const todoControllers = {
  GET: async (request, response) => {
    try {
      const sql = `SELECT * FROM tasks`;
      db.all(sql, [], (error, rows) => {
        if (error) {
          return response
            .status(500)
            .json({ error: "Error fetching all tasks" });
        }
        response.render("index", { tasks: rows });
      });
    } catch (error) {
      console.error("Error in GET:", error);
      response.status(500).json({ error: "Server error" });
    }
  },
  POST: async (request, response) => {
    const { task } = request.body;
    if (!task) {
      return response.status(400).json({ Error: "Some Fields are missing" });
    }
    try {
      const sql = `INSERT INTO tasks (task) VALUES (?)`;
      db.run(sql, [task], function (error) {
        if (error) {
          return response.status(500).json({ error: "Failed to add task" });
        }
        response.redirect("/");
      });
    } catch (error) {
      console.error("Error in POST:", error);
      response.status(500).json({ error: "Server error" });
    }
  },
  DELETE: async (request, response) => {
    const { id } = request.params;
    try {
      const sql = `DELETE FROM tasks WHERE id = ?`;
      db.run(sql, [id], function (error) {
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
    } catch (error) {
      console.error("Error in DELETE:", error);
      response.status(500).json({ error: "Server error" });
    }
  },
};

module.exports = todoControllers;
