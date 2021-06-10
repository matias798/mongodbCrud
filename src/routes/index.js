var express = require('express');
var router = express.Router();

const Task = require('../models/task')
/* GET home page. */
router.get('/',async function(req, res, next) {
  const tasks= await Task.find();
  res.render('index',{tasks});
});
/* Post home page. */
router.post('/add', async function(req, res, next) {
const task = new Task(req.body);
await task.save()
res.redirect('/')
});

module.exports = router;
