const db = require('./models')
const express = require('express')
const bodyParser = require('body-parser')
let app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')
 
app.get('/', (req, res) => {
  res.send(`i'm here!`)
})

// Display all teacher data
app.get('/teachers', (req, res) => {
  db.Teacher.findAll({})
  .then((data) => {
    res.render('teachers/teacher', {teacherData: data})
  })
  .catch((err) => {
    res.send(err.message)
  })
})

// Display all student data
app.get('/students', (req, res) => {
  db.Student.findAll({})
  .then((data) => {
    res.render('students/student', {studentData: data})
  })
  .catch((err) => {
    res.send(err.message)
  })
})

// Display all subject data
app.get('/subjects', (req, res) => {
  db.Subject.findAll({})
  .then((data) => {
    res.render('subjects/subject', {subjectData: data})
  })
  .catch((err) => {
    res.send(err.message)
  })
})
 
app.listen(3000)