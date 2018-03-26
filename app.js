'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const model = require('./models');
let app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));


app.get('/students', function(req, res){
    model.Student.findAll({raw:true})
    .then(function(student_data){
        res.render('students', {student_data});
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/students/add-student', function(req, res){
    res.render('add-student');
})

app.post('/students/add-student', function(req, res){
    console.log(JSON.stringify(req.body));
    model.Student.create({
        first_name: req.body.first_name,
        last_name: req.body.lastn_ame,
        email: req.body.email
    })
    .then(function(){
        model.Student.findAll({})
        .then((student_data) => res.render('students', {student_data}))
        .catch((err) => console.log(err))
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/students/edit-student', function(req, res){
    let newId = parseInt(req.query.id);
    model.Student.findOne({
        where: {
            id: newId
        }
    })
    .then(function(student_data){
        res.render('edit-student', {student_data});
    })
    .catch(function(err){
        console.log(err);
    })
})

app.post('/students/edit-student', function(req, res){
    let id = parseInt(req.query.id);
    model.Student.update({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
    },{
        where: {id: id}
    })
    .then(function(){
        model.Student.findAll({})
        .then((student_data) => res.render('students', {student_data}))
        .catch((err) => console.log(err))
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/students/delete-student', function(req, res){
    let id = parseInt(req.query.id);
    model.Student.destroy({
        where: {
            id: id
        }
    })
    .then(function(){
        model.Student.findAll({})
        .then((student_data) => res.render('students', {student_data}))
        .catch((err) => console.log(err))
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/teachers', function(req,res){
    model.Teacher.findAll({})
    .then(function(teacher_data){
        res.render('teachers', {teacher_data});
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/teachers/add-teacher', function(req, res){
    res.render('add-teacher');
})

app.post('/teachers/add-teacher', function(req, res){
    model.Teacher.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    })
    .then(function(){
        model.Teacher.findAll({})
        .then((teacher_data) => res.render('teachers', {teacher_data}))
        .catch((err) => console.log(err))
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/teachers/edit-teacher', function(req, res){
    let id = parseInt(req.query.id);
    model.Teacher.findOne({
        where: {
            id: id
        }
    })
    .then(function(teacher_data){
        res.render('edit-teacher', {teacher_data});
    })
    .catch(function(err){
        console.log(err);
    })
})


app.post('/teachers/edit-teacher', function(req, res){
    let id = parseInt(req.query.id);
    model.Teacher.update({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
    },{
        where: {id: id}
    })
    .then(function(){
        model.Teacher.findAll({})
        .then((teacher_data) => res.render('teachers', {teacher_data}))
        .catch((err) => console.log(err))
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/teachers/delete-teacher', function(req, res){
    let id = parseInt(req.query.id);
    model.Teacher.destroy({
        where: {
            id: id
        }
    })
    .then(function(){
        model.Teacher.findAll({})
        .then((teacher_data) => res.render('teachers', {teacher_data}))
        .catch((err) => console.log(err))
    })
    .catch(function(err){
        console.log(err);
    })
})


app.get('/subjects', function(req, res){
    model.Subject.findAll({})
    .then(function(subject_data){
        res.render('subjects', {subject_data});
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/subjects/add-subject', function(req, res){
    res.render('add-subject');
})

app.post('/subjects/add-subject', function(req, res){
    model.Subject.create({
        subject_name: req.body.subject_name
    })
    .then(function(){
        model.Subject.findAll({})
        .then((subject_data) => res.render('subjects', {subject_data}))
        .catch((err) => console.log(err))
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/subjects/edit-subject', function(req, res){
    let id = parseInt(req.query.id);
    model.Subject.findOne({
        where: {
            id: id
        }
    })
    .then(function(subject_data){
        res.render('edit-subject', {subject_data});
    })
    .catch(function(err){
        console.log(err);
    })
})

app.post('/subjects/edit-subject', function(req, res){
    let id = parseInt(req.query.id);
    model.Subject.update({
        subject_name: req.body.subject_name
    },{
        where: {id: id}
    })
    .then(function(){
        model.Subject.findAll({})
        .then((subject_data) => res.render('subjects', {subject_data}))
        .catch((err) => console.log(err))
    })
    .catch(function(err){
        console.log(err);
    })
})

app.get('/subjects/delete-subject', function(req, res){
    let id = parseInt(req.query.id);
    model.Subject.destroy({
        where: {
            id: id
        }
    })
    .then(function(){
        model.Subject.findAll({})
        .then((subject_data) => res.render('subjects', {subject_data}))
        .catch((err) => console.log(err))
    })
    .catch(function(err){
        console.log(err);
    })
})

app.listen(3000);
