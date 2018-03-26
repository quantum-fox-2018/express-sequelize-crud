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
  res.render('student_add');
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
    res.render('student_add_success', { student: req.body });
  })
  .catch(error => {
    console.log(error.message);
  })
})

students.get('/edit/:id', (req, res) => {
  let id = req.params.id;

  models.Student
  .findById(id)
  .then(student => {
    res.render('student_edit', { student })
  })
  .catch(error => {
    console.log(error.message);
  })
})

students.post('/edit/:id', (req, res) => {
  let newData = {
    id          : req.params.id,
    first_name  : req.body.first_name,
    last_name   : req.body.last_name,
    email       : req.body.email
  }
  console.log(newData);

  models.Student
  .update(newData, { where: { id: newData.id } } )
  .then(success => {
    res.render('student_edit_success', { student: req.body})
  })
  .catch(error => {
    console.log(error.message);
  })
})

students.get('/delete/:id', (req, res) => {
  models.Student
  .destroy({ where: { id: req.params.id } })
  .then(success => {
    res.redirect('/students');
  })
  .catch(error => {
    console.log(error.message);
  })
})

module.exports = students;
