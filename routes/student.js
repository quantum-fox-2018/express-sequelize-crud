var express = require('express')
var router = express.Router();
const models = require('../models/student');


router.get('/student', (req, res) => {
  res.render('student');
})

module.exports = router
