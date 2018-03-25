const express = require('express')
let app = express()
var bodyParser = require('body-parser')
const model = require('./models')

app.use(bodyParser.urlencoded({extended:false}))

app.set('view engine', 'ejs')

app.get('/student', (req, res) => {
  model.Student.findAll()
  .then(function(data_student) {
    res.render('student', {all_student: data_student})
  })
})

app.get('/student/add', (req, res) => {
  res.render('form')
})

app.post('/student/add', (req, res) => {
  res.render('register_success', req.body)
  model.Student.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  })
})

app.get('/student/edit/:id', (req, res) => {
  model.Student.findById(req.params.id)
  .then(function(data_student) {
    res.render('edit_form', {all_student: data_student})
  })
})

app.post('/student/edit/:id', (req, res) => {
  model.Student.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }, {
    where: {id: req.params.id}
  })
  .then(function(edit_data) {
    res.render('edit_success', req.body)
  })
})

app.get('/student/delete/:id', (req, res) => {
  model.Student.destroy({
    where: {id: req.params.id}
  })
  .then(function(deleted_data) {
    res.render('delete_success', req.body);
  })
})

app.listen(3000)
