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

// add data teachers
app.get('/teachers/addTeacher',function(){
  res.render('./teachers/addTeacher')
})

app.get('/teachers/edit/:id',function(req,res){
  res.render('./teachers/edit')
})

})

// =========================================== Subjects
app.get('/subjects',function(req,res){
  model.Subject.findAll({raw:true})
  .then(Subjects => {
    res.render('subjects',{
      Subjects:Subjects
    })
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

app.listen(3000)
