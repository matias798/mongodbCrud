var express = require('express');
var router = express.Router();

const Task = require('../models/task')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
/* Post home page. */
router.post('/add', async function(req, res, next) {
const task = new Task(req.body);
await task.save()
res.send(req.body)
});

module.exports = router;
