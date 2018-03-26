const db = require('./models');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine','ejs');

app.get('/', (req, res)=>{
  res.send('Home Page')
})

//TEACHER
//============
app.get('/teachers', (req, res)=>{
  db.Teacher.findAll({})
  .then((teacher)=>{
    res.render('teachers/teacher.ejs', {teacher})
  })
  .catch((err)=>{
    console.log(err);
  })
})

app.get('/teachers/add', (req, res)=>{
  res.render('teachers/add-teacher.ejs', {title: 'Teacher Add Form'})
})

app.post('/teachers/add', (req, res)=>{
  db.Teacher.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  })
})

app.get('/teachers/edit/:id', (req, res)=>{
  let id = req.params.id;
  db.Teacher.findById(id)
  .then((teacher)=>{
    res.render('teachers/edit-teacher.ejs', {teacher})
  })
  .catch((err)=>{
    console.log(err);
  })
})

app.post('/teachers/edit/:id', (req, res)=>{
  let id = req.params.id;
  db.Teacher.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  },{
    where: {id: id}
  })
  .then((teacher) =>{
    res.render('teachers/edit-teacher.ejs', {teacher})
  })
  .catch((err)=>{
        console.log(err);
    })
})

app.get('/teachers/delete/:id', (req, res) => {
  db.Teacher.destroy({ where: { id: req.params.id } })
  .then(success => {
    res.redirect('/teachers');
  })
  .catch(error => {
    console.log(error.message);
  })
})

//SUBJECT
//============
app.get('/subjects', (req, res)=>{
  db.Subject.findAll({})
  .then((subject)=>{
    res.render('subjects/subject.ejs', {subject})
  })
  .catch((err)=>{
    console.log(err);
  })
})

app.get('/subjects/add', (req, res)=>{
  res.render('subjects/add-subject.ejs', {title: 'Subject Add Form'})
})

app.post('/subjects/add', (req, res)=>{
  db.Subject.create({
    subject_name: req.body.subject_name,
  })
})

app.get('/subjects/edit/:id', (req, res)=>{
  let id = req.params.id;
  db.Subject.findById(id)
  .then((subject)=>{
    res.render('subjects/edit-subject.ejs', {subject})
  })
  .catch((err)=>{
    console.log(err);
  })
})

app.post('/subjects/edit/:id', (req, res)=>{
  let id = req.params.id;
  db.Subject.update({
    subject_name: req.body.subject_name,
  },{
    where: {id: id}
  })
  .then((subject) =>{
    res.render('subjects/edit-subject.ejs', {subject})
  })
  .catch((err)=>{
        console.log(err);
    })
})

app.get('/subjects/delete/:id', (req, res) => {
  db.Subject.destroy({ where: { id: req.params.id } })
  .then(success => {
    res.redirect('/subjects');
  })
  .catch(error => {
    console.log(error.message);
  })
})

//STUDENT
//=============
app.get('/students', (req, res)=>{
  db.Student.findAll({})
  .then((student)=>{
    res.render('students/student.ejs', {student})
  })
  .catch((err)=>{
    console.log(err);
  })
})

app.get('/students/add', (req, res)=>{
  res.render('students/add-student.ejs', {title: 'Student Add Form'})
})

app.post('/students/add', (req, res)=>{
  db.Student.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name
  })
})

app.get('/students/edit/:id', (req, res)=>{
  let id = req.params.id;
  db.Student.findById(id)
  .then((student)=>{
    res.render('students/edit-student.ejs', {student})
  })
  .catch((err)=>{
    console.log(err);
  })
})

app.post('/students/edit/:id', (req, res)=>{
  let id = req.params.id;
  db.Student.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  },{
    where: {id: id}
  })
  .then((student) =>{
    res.render('students/edit-student.ejs', {student})
  })
  .catch((err)=>{
        console.log(err);
    })
})

app.get('/students/delete/:id', (req, res) => {
  db.Student.destroy({ where: { id: req.params.id } })
  .then(success => {
    res.redirect('/students');
  })
  .catch(error => {
    console.log(error.message);
  })
})

app.listen(3000)
