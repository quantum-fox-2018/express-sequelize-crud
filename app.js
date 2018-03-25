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

app.get('/teachers/add',function(req,res){
  res.render('teachers/addTeacher')
})

// add data teachers
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

app.get('/teachers/edit/:id',function(req,res){
  let id = req.params.id
  model.Teacher.findById(id)
  .then(teacher => {
    let objTeacher = {teacher}
    res.render('teachers/editTeacher', objTeacher)
  })
  .catch(err => {res.send(err)})
})

// edit data teacher
app.post('/teachers/edit/:id',function(req,res){
  let idObj = req.params.id
  let obj = req.body
  model.Teacher.update(
    obj,
    {
      where:{id:idObj}
    }
  )
  .then(() => {
    res.redirect('/teachers')
  })
  .catch(err => {res.send(err)})
})

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

app.get('/subject/add',function(req,res){
  res.render('subjects/addSubject')
})

// add data subject
app.post('/subject/add',function(req,res){
  model.Subject.create({
    subject_name: req.body.subject_name,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(added => {
    res.redirect('/subjects' )
  })
  .catch(err => {res.send(err)})
})

app.get('/subjects/edit/:id', function(req,res){
  let id = req.params.id
  model.Subject.findById(id)
  .then(subject => {
    let objSubject = {subject}
    res.render('subjects/editSubject',objSubject)
  })
  .catch(err => {res.send(err)})
})

// edit data subject
app.post('/subjects/edit/:id', (req,res) => {
  let idObj = req.params.id
  let obj = req.body
  model.Subject.update(
    obj,
    {where:{
      id:idObj
    }}
  )
  .then(() => {
    res.redirect('/subjects')
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

// add data student
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

app.get('/students/edit/:id', function(req,res){
  let id = req.params.id
  model.Student.findById(id)
  .then(student => {
    let objStudent = {student}
    res.render('students/editStudent',objStudent)
  })
  .catch(err => {res.send(err)})
})

app.post('/students/edit/:id', (req,res) => {
  let idObj = req.params.id
  let obj = req.body
  model.Student.update(
    obj,
    {where:{
      id:idObj
    }}
  )
  .then(() => {
    res.redirect('/Students')
  })
  .catch(err => {res.send(err)})
})

app.listen(3000)
