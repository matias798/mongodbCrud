var express = require("express");
var router = express.Router();
const Task = require("../models/task");

/* GET home page. */
router.get("/", async function (req, res) {
  const tasks = await Task.find();
  res.render("index", { tasks });
});

/* Adding new task home page. */
router.post("/add", async function (req, res) {
  const task = new Task(req.body);
  await task.save();
  res.redirect("/");
});

/* Delete selected task */
router.get("/delete/:id", async (req, res, next) => {
  let { id } = req.params;
  await Task.remove({ _id: id });
  res.redirect("/");
});

module.exports = router;
