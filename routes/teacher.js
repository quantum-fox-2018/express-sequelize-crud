var express = require('express')
var router = express.Router()
const models = require('../models');

router.get('/teacher', (req, res) => {
  models.Teacher.findAll({include: [{model: models.Subject}]})
  .then(values => {
    // res.send(values)
    let obj = {info: values};
    res.render('teacher', obj)
  })
  // res.render('teacher')
})


router.get('/teacher/add', (req,res) => {
  res.render('teacher_add')
})

router.get('/teacher/edit/:teacher_id', (req,res) => {
  let teacherId = req.params.teacher_id;

  models.Teacher.findOne({where:
    {id: teacherId}
  })
  .then(values => {
    let obj = {info: values}
    res.render('editTeacher.ejs', obj)
  })
  // res.render('editTeacher.ejs')
})

router.post('/teacher/edit/', (req, res) => {
  let teacher_id = req.body.teacherId;
  // models.Teacher.findOne({where: {id: teacher_id}})
  // .then(values => {
  //   models.Teacher.update()
  //
  // })
  models.Teacher.update({first_name: req.body.firstname,
    last_name: req.body.lastname,
    email: req.body.email
  }, {where: {id: teacher_id}})
  res.redirect('/teacher')
})

router.post('/teacher/add', (req,res) => {
  // console.log(req.body)
  models.Teacher.create({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    email: req.body.email,
    SubjectId: 3})
  res.render('teacher_add')
})

router.get('/teacher/delete/:id', function(req, res) {
  let teacherId = req.params.id;

  models.Teacher.destroy({where: {id: teacherId}})
  .then(values => {
    // let obj = {info: values};
    res.redirect('/teacher');
  })
})

module.exports = router
