const express   = require('express');
const teachers  = express.Router();
const models = require('../../models');

teachers.get('/', (req, res) => {
  models.Teacher
  .findAll({
    order: [
      ['id', 'ASC']
    ]
  })
  .then(teachers => {
    res.render('teachers', { teachers })
  })
  .catch(error => {
    console.log(error.message);
  })
})

teachers.get('/add', (req, res) => {
  res.render('teacher_add');
})

teachers.post('/add', (req, res) => {
  models.Teacher
  .build({
    first_name  : req.body.first_name,
    last_name   : req.body.last_name,
    email       : req.body.email
  })
  .save()
  .then(success => {
    res.render('teacher_add_success', { teacher: req.body });
  })
  .catch(error => {
    console.log(error.message);
  })
})

teachers.get('/edit/:id', (req, res) => {
  let id = req.params.id;

  models.Teacher
  .findById(id)
  .then(teacher => {
    res.render('teacher_edit', { teacher })
  })
  .catch(error => {
    console.log(error.message);
  })
})

teachers.post('/edit/:id', (req, res) => {
  let newData = {
    id          : req.params.id,
    first_name  : req.body.first_name,
    last_name   : req.body.last_name,
    email       : req.body.email
  }
  console.log(newData);

  models.Teacher
  .update(newData, { where: { id: newData.id } } )
  .then(success => {
    res.render('teacher_edit_success', { teacher: req.body})
  })
  .catch(error => {
    console.log(error.message);
  })
})

teachers.get('/delete/:id', (req, res) => {
  models.Teacher
  .destroy({ where: { id: req.params.id } })
  .then(success => {
    res.redirect('/teachers');
  })
  .catch(error => {
    console.log(error.message);
  })
})

module.exports = teachers;
