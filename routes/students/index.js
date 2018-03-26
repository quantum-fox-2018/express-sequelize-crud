const express   = require('express');
const students  = express.Router();
const models = require('../../models');

students.get('/', (req, res) => {
  models.Student
  .findAll({
    order: [
      ['id', 'ASC']
    ]
  })
  .then(students => {
    res.render('students', { students })
  })
  .catch(error => {
    console.log(error.message);
  })
})

students.get('/add', (req, res) => {
  res.render('students_add');
})

students.post('/add', (req, res) => {
  models.Student
  .build({
    first_name  : req.body.first_name,
    last_name   : req.body.last_name,
    email       : req.body.email
  })
  .save()
  .then(success => {
    res.render('students_add_success', { student: req.body });
  })
  .catch(error => {
    console.log(error.message);
  })
})

students.get('/edit/:id', (res, req) => {
  models.Student
  .findById(req.params.id)
  .then(student => {
    res.render('student_edit', { student })
  })
  .catch(error => {
    console.log(error.message);
  })
})

module.exports = students;
