require("dotenv").config();
const express = require("express");
const app = express();

const todoRouter = require("./src/routes/todo.routes");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/ping", (request, response) => {
  response.send("This is a test route");
});

app.use("/", todoRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});

module.exports = app;
