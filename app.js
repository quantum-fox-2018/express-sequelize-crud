const express = require('express');
const app = express();
const db = require('./models');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('homepage')
})

app.get('/teachers', (req, res) => {
  db.Teacher.findAll()
    .then( teachers => {
      res.render('teacherslist', {teachers: teachers})
    })
})

app.get('/subjects', (req, res) => {
  db.Subject.findAll()
    .then( subjects => {
      res.render('subjectslist', {subjects: subjects})
    })
})
//-----------------------------------------------------------------------------------------------------

app.get('/teachers/add', (req, res) => {
  res.render('teacher_form', {title: "Teacher Registration Form"})
})

app.post('/teachers/add', (req, res) => {
  db.Teacher.create({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    email: req.body.email
  })
})

app.get('/subjects/add', (req, res) => {
  res.render('subject_form', {title: "Subject Registration Form"})
})

app.post('/subjects/add', (req, res) => {
  db.Subject.create({
    subject_name: req.body.subjectname
  })
})

//-----------------------------------------------------------------------------------------------------

app.get('/teachers/edit/:id', (req, res) => {
  db.Teacher.findById(req.params.id)
    .then(teacher => {
    res.render('teacher_edit', {teacher: teacher})
  })
})

app.post('/teachers/edit/:id', (req, res) => {

  db.Teacher.update({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    email: req.body.email
  },{
    where: { id: req.params.id }
  }).then( (teacherUp) => {
  res.render('teacher_edit_success', {teacherUp: teacherUp})
  })
})

app.get('/subjects/edit/:id', (req, res) => {
  db.Subject.findById(req.params.id)
    .then(subject => {
    res.render('subject_edit', {subject: subject})
  })
})

app.post('/subjects/edit/:id', (req, res) => {

  db.Subject.update({
    subject_name: req.body.subjectname
  },{
    where: { id: req.params.id }
  }).then( (subjectUp) => {
  res.render('teacher_edit_success', {subjectUp: subjectUp})
  })
})

//-----------------------------------------------------------------------------------------------------

app.get('/teachers/delete/:id', (req, res) => {
  db.Teacher.destroy({
    where: { id: req.params.id }
  }).then(deleted => {
  res.send("Teacher has been deleted from Teachers List");
  });
})

app.get('/subjects/delete/:id', (req, res) => {
  db.Subject.destroy({
    where: { id: req.params.id }
  }).then(deleted => {
  res.send("Subject has been deleted from Subject List");
  });
})

//-----------------------------------------------------------------------------------------------------

app.listen(3000);
