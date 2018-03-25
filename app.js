'use strict'
const express = require ('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const db = require('./models')

let app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

app.get('/', function(req, res){
  res.render('index')
})


/////////////////

app.get('/students', function(req, res){
  db.Student.findAll({})
  .then(function(data){
    res.render('student_list', {studentData: data})
  }).catch(function(err){
    console.log(err);
  })
})

app.get('/students/add', function(req, res){
  res.render('add_student_form')
})

app.post('/students/add', function(req, res){
  //res.send(req.body)
  db.Student.create({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email
  }).then(function(successRow){
    db.Student.findAll({})
      .then(function(data){
        let obj = new Object()
        obj.title="update Student"
        obj.studentData =  data
        res.render('student_list', obj)
      }).catch(function(err){
        console.log(err);
      })
  })
})

app.get('/students/edit/:id', function(req, res){
  db.Student.findById(req.params.id)
  .then(function(data){
  res.render('update_student_form', {studentData: data})
  })
})

app.post('/students/edit/:id', function(req, res){
  db.Student.update(
    {firstName:req.body.firstName,
     lastName:req.body.lastName,
     email:req.body.email},
    {where: {id:req.params.id}}
  ).then(function(data){
    db.Student.findAll({})
    .then(function(data){
      res.render('student_list', {studentData: data.sort()})
    }).catch(function(err){
      console.log(err);
    })
  })
})

app.get('/students/delete/:id', function(req, res){
  db.Student.destroy({
    where: {id: req.params.id}
  }).then(function(msg){
    db.Student.findAll({})
      .then(function(data){
        let obj = new Object()
        obj.studentData =  data
        res.render('student_list', obj)
      }).catch(function(err){
        console.log(err);
      })
  })
})

//////////////////////////////////////

app.get('/teachers', function(req, res){
  db.Teacher.findAll({})
  .then(function(data){
    res.render('teacher_list', {teacherData: data})
  }).catch(function(err){
    console.log(err);
  })
})

app.get('/teachers/add', function(req, res){
  res.render('add_teacher_form')
})

app.post('/teachers/add', function(req, res){
  //res.send(req.body)
  db.Teacher.create({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email
  }).then(function(successRow){
    db.Teacher.findAll({})
      .then(function(data){
        let obj = new Object()
        obj.teacherData =  data
        res.render('teacher_list', obj)
      }).catch(function(err){
        console.log(err);
      })
  })
})

app.get('/teachers/edit/:id', function(req, res){
  db.Teacher.findById(req.params.id)
  .then(function(data){
  res.render('update_teacher_form', {teacherData: data})
  })
})

app.post('/teachers/edit/:id', function(req, res){
  db.Teacher.update(
    {firstName:req.body.firstName,
     lastName:req.body.lastName,
     email:req.body.email},
    {where: {id:req.params.id}}
  ).then(function(data){
    db.Teacher.findAll({})
    .then(function(data){
      res.render('teacher_list', {teacherData: data.sort()})
    }).catch(function(err){
      console.log(err);
    })
  })
})

app.get('/teachers/delete/:id', function(req, res){
  db.Teacher.destroy({
    where: {id: req.params.id}
  }).then(function(msg){
    db.Teacher.findAll({})
      .then(function(data){
        let obj = new Object()
        obj.teacherData =  data
        res.render('teacher_list', obj)
      }).catch(function(err){
        console.log(err);
      })
  })
})

// =======================================================

app.get('/subjects', function(req, res){
  db.Subject.findAll({})
  .then(function(data){
    res.render('subject_list', {subjectData: data})
  }).catch(function(err){
    console.log(err);
  })
})

app.get('/subjects/add', function(req, res){
  res.render('add_subject_form')
})

app.post('/subjects/add', function(req, res){
  //res.send(req.body)
  db.Subject.create({
    subjectName:req.body.subjectName,

  }).then(function(successRow){
    db.Subject.findAll({})
      .then(function(data){
        let obj = new Object()
        obj.subjectData =  data
        res.render('subject_list', obj)
      }).catch(function(err){
        console.log(err);
      })
  })
})

app.get('/subjects/edit/:id', function(req, res){
  db.Subject.findById(req.params.id)
  .then(function(data){
  res.render('update_subject_form', {subjectData: data})
  })
})

app.post('/subjects/edit/:id', function(req, res){
  db.Subject.update(
    {subjectName:req.body.subjectName,},
    {where: {id:req.params.id}}
  ).then(function(data){
    db.Subject.findAll({})
    .then(function(data){
      res.render('subject_list', {subjectData: data.sort()})
    }).catch(function(err){
      console.log(err);
    })
  })
})

app.get('/subjects/delete/:id', function(req, res){
  db.Subject.destroy({
    where: {id: req.params.id}
  }).then(function(msg){
    db.Subject.findAll({})
      .then(function(data){
        let obj = new Object()
        obj.subjectData =  data
        res.render('subject_list', obj)
      }).catch(function(err){
        console.log(err);
      })
  })
})

app.listen(3000)
