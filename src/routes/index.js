var express = require("express");
var router = express.Router();
const Task = require("../models/task");

/* GET home page. */
router.get("/", async function (req, res) {
  const tasks = await Task.find();
  res.render("index", { tasks });
});

/* Adding new task to home page */
router.post("/add", async function (req, res) {
  const task = new Task(req.body);
  await task.save();
  res.redirect("/");
});

/* Edit view next( GET ) */
router.get("/edit/:id", async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  console.log(task);
  res.render("edit", { task });
});

/* Edit view next( POST ) */
router.post("/edit/:id", async (req, res, next) => {
  const { id } = req.params;
  await Task.update({ _id: id }, req.body);
  res.redirect("/");
});

/* Delete selected task */
router.get("/delete/:id", async (req, res, next) => {
  let { id } = req.params;
  await Task.remove({ _id: id });
  res.redirect("/");
});

/* change the task state */
router.get("/turn/:id", async (req, res, next) => {
  let { id } = req.params;
  const task = await Task.findById(id);
  task.status = !task.status;
  await task.save();
  res.redirect("/");
});

module.exports = router;
