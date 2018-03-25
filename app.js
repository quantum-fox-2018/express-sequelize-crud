const model = require('./models');
var ejs = require('ejs')
const express = require('express');
const app = express()
const bodyParser = require('body-parser')

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:false}))

app.get('/', function (req, res){res.render('homepage')})

// =========================================== Teachers
// show data teacher
app.get('/teachers',function(req,res){
  model.Teacher.findAll({raw:true})
  .then(Teachers => {
    res.render('teachers',{
      Teachers:Teachers
    })
  })
  .catch(err => {res.send(err)})
})

// add data teachers
app.get('/teachers/add',function(req,res){
  res.render('teachers/addTeacher')
})

app.post('/teachers/add',function(req,res){
  model.Teacher.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(added => {
    // let alert = 'the Data have inputed...'
    res.redirect('/teachers' )
  })
  .catch(err => {res.send(err)})
})

// app.get('/teachers/edit/:id',function(req,res){
//   res.render('./teachers/edit')
// })


// =========================================== Subjects
// show data subject
app.get('/subjects',function(req,res){
  model.Subject.findAll({raw:true})
  .then(Subjects => {
    res.render('subjects',{
      Subjects:Subjects
    })
  })
  .catch(err => {res.send(err)})
})

// add data subject
app.get('/subject/add',function(req,res){
  res.render('subjects/addSubject')
})

app.post('/subject/add',function(req,res){
  model.Subject.create({
    subject_name: req.body.subject_name,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(added => {
    // let alert = 'the Data have inputed...'
    res.redirect('/subjects' )
  })
  .catch(err => {res.send(err)})
})

// =========================================== Students
app.get('/students', function (req, res){
  model.Student.findAll()
  .then(Students => {
    res.render('students',{
      Students:Students
    })
  })
  .catch(err => {res.send(err)})
})

app.get('/students/add',function(req, res){
  res.render('students/addStudent')
})

app.post('/students/add',function(req, res){
  model.Student.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(added => {
    res.redirect('/students')
  })
  .catch(err => {res.send(err)})
})

app.listen(3000)
