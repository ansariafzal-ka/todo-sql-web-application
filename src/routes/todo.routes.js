const express = require("express");
const router = express.Router();
const todoControllers = require("../controllers/todo.controllers");

router.get("/", todoControllers.GET);
router.post("/", todoControllers.POST);
router.post("/delete/:id", todoControllers.DELETE);

module.exports = router;
