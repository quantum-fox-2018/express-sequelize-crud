const express = require('express')
var app = express()
const Model = require('./models/index.js')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs')

app.get('/', function(req,res){
  res.render('home.ejs')
})


//Database students
app.get('/students', function(req,res){

  Model.Student.findAll({raw:true,order: [['id', 'ASC']]}).then(students=>{
    res.render('students.ejs', { data_students: students})
  })
})

app.get('/students/add', function(req,res){
  res.render('add_student_form.ejs')
})

app.post('/students/add', function(req,res){

  let firstName = req.body.first_name
  let lastName = req.body.last_name
  let objNewStudent = {
    first_name: firstName,
    last_name: lastName
  }
  Model.Student.create(objNewStudent)
  .then(()=>{
    res.redirect('/students')
  })
})

app.get('/students/edit/:student_id', function(req, res) {

  let studentId = req.params.student_id;
  Model.Student.findOne({where: {id: studentId}})
  .then(data_student =>{
    res.render('edit_student', {student: data_student})
  })

});

app.post('/students/edit', (req, res) => {

  let firstName= req.body.first_name
  let lastName= req.body.last_name
  let student_id= req.body.studentId

  var newData = {
    first_name: firstName,
    last_name: lastName,
    updatedAt: new Date()
  };

  Model.Student.update(newData, {where: { id: student_id }})
  .then(()=>{
    res.redirect('/students')
  })

})

app.get('/students/delete/:student_id', function(req,res){

  let studentId = req.params.student_id
  Model.Student.destroy({where: {id: studentId}})
  res.redirect('/students')
})


//Untuk database teachers
app.get('/teachers', function(req,res){

  Model.Teacher.findAll({raw:true}).then(teachers=>{
    res.render('teachers.ejs', { data_teachers: teachers})
  })
})

app.get('/teachers/add', function(req,res){

  res.render('add_teacher_form.ejs')
})

app.post('/teachers/add', function(req,res){

  let firstName = req.body.first_name
  let lastName = req.body.last_name
  let email = req.body.email
  let objNewTeacher = {
    first_name: firstName,
    last_name: lastName,
    email: email
  }
  Model.Teacher.create(objNewTeacher)
  .then(()=>{
    res.redirect('/teachers')
  })
})

app.get('/teachers/edit/:teacher_id', function(req,res){

  let teacherId = req.params.teacher_id;
  Model.Teacher.findOne({where: {id: teacherId}})
  .then(data_teacher =>{
    res.render('edit_teacher', {teacher: data_teacher})
  })

})

app.post('/teachers/edit', function(req,res){

  let firstName= req.body.first_name
  let lastName= req.body.last_name
  let email= req.body.email
  let teacher_id= req.body.teacherId

  var newData = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    updatedAt: new Date()
  };

  Model.Teacher.update(newData, {where: { id: teacher_id }})
  .then(()=>{
    res.redirect('/teachers')
  })

})

app.get('/teachers/delete/:teacher_id', function(req,res){

  let teacherId = req.params.teacher_id
  Model.Teacher.destroy({where: {id: teacherId}})
  res.redirect('/teachers')

})


//Untuk database subjects
app.get('/subjects',function(req,res){

  Model.Subject.findAll({raw:true,order: [['id', 'ASC']]}).then(subjects=>{
    res.render('subjects.ejs', { data_subjects: subjects})
  })
})

app.get('/subjects/add', function(req,res){

  res.render('add_subject_form.ejs')
})

app.post('/subjects/add', function(req,res){

  let subjectName = req.body.subject_name

  let objNewSubject = {
    subject_name: subjectName
  }
  Model.Subject.create(objNewSubject)
  .then(()=>{
    res.redirect('/subjects')
  })
})

app.get('/subjects/edit/:subject_id', function(req,res){

  let subjectId = req.params.subject_id;
  Model.Subject.findOne({where: {id: subjectId}})
  .then(data_subject =>{
    res.render('edit_subject', {subject: data_subject})
  })

})

app.post('/subjects/edit', function(req,res){

  let subjectName= req.body.subject_name
  let subject_id= req.body.subjectId

  var newData = {
    subject_name: subjectName,
    updatedAt: new Date()
  };

  Model.Subject.update(newData, {where: { id: subject_id }})
  .then(()=>{
    res.redirect('/subjects')
  })

})

app.get('/subjects/delete/:subject_id', function(req,res){

  let subjectId = req.params.subject_id
  Model.Subject.destroy({where: {id: subjectId}})
  res.redirect('/subjects')

})

app.listen(3000)
