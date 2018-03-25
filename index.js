'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const model = require('./models');

let app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));


//================
//TEACHERS
//================
app.get('/teachers', function(req,res){
    model.Teacher.findAll({})
    .then(function(teacherData){
        res.render('teachers', {teacherData});
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/teachers/addTeacher', function(req, res){
    res.render('addTeacher');
})

app.post('/teachers/addNewTeacher', function(req, res){
    model.Teacher.create({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email
    })
    .then(function(){
        model.Teacher.findAll({})
        .then((teacherData) => res.render('teachers', {teacherData}))
        .catch((err) => console.log(err))
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/teachers/editTeacher', function(req, res){
    let newId = parseInt(req.query.id);
    model.Teacher.findOne({
        where: {
            id: newId
        }
    })
    .then(function(teacherData){
        res.render('editTeacher', {teacherData});
    })
    .catch(function(err){
        console.log(err);
    })
})

app.post('/teachers/edit_teacher', function(req, res){
    let newId = parseInt(req.query.id);
    model.Teacher.update({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
    },{
        where: {id: newId}
    })
    .then(function(){
        model.Teacher.findAll({})
        .then((teacherData) => res.render('teachers', {teacherData}))
        .catch((err) => console.log(err))
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/teachers/deleteTeacher', function(req, res){
    let newId = parseInt(req.query.id);
    model.Teacher.destroy({
        where: {
            id: newId
        }
    })
    .then(function(){
        model.Teacher.findAll({})
        .then((teacherData) => res.render('teachers', {teacherData}))
        .catch((err) => console.log(err))
    })
    .catch(function(err){
        console.log(err);
    })
})

//==================
//STUDENTS
//==================
app.get('/students', function(req, res){
    model.Student.findAll({raw:true})
    .then(function(studentData){
        res.render('students', {studentData});
        // console.log(studentData)
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/students/addStudent', function(req, res){
    res.render('addStudent');
})

app.post('/students/addNewStudent', function(req, res){
    console.log(JSON.stringify(req.body));
    model.Student.create({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email
    })
    .then(function(){
        model.Student.findAll({})
        .then((studentData) => res.render('students', {studentData}))
        .catch((err) => console.log(err))
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/students/editStudent', function(req, res){
    let newId = parseInt(req.query.id);
    model.Student.findOne({
        where: {
            id: newId
        }
    })
    .then(function(studentData){
        res.render('editStudent', {studentData});
    })
    .catch(function(err){
        console.log(err);
    })
})

app.post('/students/edit_student', function(req, res){
    let newId = parseInt(req.query.id);
    model.Student.update({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
    },{
        where: {id: newId}
    })
    .then(function(){
        model.Student.findAll({})
        .then((studentData) => res.render('students', {studentData}))
        .catch((err) => console.log(err))
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/students/deleteStudent', function(req, res){
    let newId = parseInt(req.query.id);
    model.Student.destroy({
        where: {
            id: newId
        }
    })
    .then(function(){
        model.Student.findAll({})
        .then((studentData) => res.render('students', {studentData}))
        .catch((err) => console.log(err))
    })
    .catch(function(err){
        console.log(err);
    })
})

//=====================
//SUBJECTS
//=====================
app.get('/subjects', function(req, res){
    model.Subject.findAll({})
    .then(function(subjectData){
        res.render('subjects', {subjectData});
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/subjects/addSubject', function(req, res){
    res.render('addSubject');
})

app.post('/subjects/addNewSubject', function(req, res){
    model.Subject.create({
        subject_name: req.body.subjectName
    })
    .then(function(){
        model.Subject.findAll({})
        .then((subjectData) => res.render('subjects', {subjectData}))
        .catch((err) => console.log(err))
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/subjects/editSubject', function(req, res){
    let newId = parseInt(req.query.id);
    model.Subject.findOne({
        where: {
            id: newId
        }
    })
    .then(function(subjectData){
        res.render('editSubject', {subjectData});
    })
    .catch(function(err){
        console.log(err);
    })
})

app.post('/subjects/edit_subject', function(req, res){
    let newId = parseInt(req.query.id);
    model.Subject.update({
        subject_name: req.body.subjectName
    },{
        where: {id: newId}
    })
    .then(function(){
        model.Subject.findAll({})
        .then((subjectData) => res.render('subjects', {subjectData}))
        .catch((err) => console.log(err))
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/subjects/deleteSubject', function(req, res){
    let newId = parseInt(req.query.id);
    model.Subject.destroy({
        where: {
            id: newId
        }
    })
    .then(function(){
        model.Subject.findAll({})
        .then((subjectData) => res.render('subjects', {subjectData}))
        .catch((err) => console.log(err))
    })
    .catch(function(err){
        console.log(err);
    })
})

app.listen(3000);