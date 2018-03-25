const express = require('express');
const {Teacher} = require('../models/index')

const router = express.Router();

router.get('/', function(req, res){
    Teacher.findAll()
    .then(row => {
        let obj = {
            cssLink: './css/style.css',
            data: row
        };
        res.render('./teachers/teacher.ejs', obj)
    })
})

router.get('/add', function(req, res){
    let obj = {
        cssLink: '../css/style.css',
    };
    res.render('./teachers/add-teacher.ejs', obj)
})

router.post('/add', function(req, res){
    Teacher.create({
        first_name: req.body.fname,
        last_name: req.body.lname,
        email: req.body.email,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .then(row => {
        let obj = {
            notif: `Anda berhasil menambahkan`
        };
        res.redirect('/teachers')
    })
})

router.get('/edit/:id', function(req, res){
    Teacher.findById(req.params.id)
    .then(row => {
        let obj = {
            cssLink: '../css/style.css',
            data: row
        };
        res.render('./teachers/edit-teacher.ejs', obj)
    })
})

router.post('/update/:id', function(req, res){
    Teacher.update({
        first_name: req.body.fname,
        last_name: req.body.lname,
        email: req.body.email,
        updatedAt: new Date()
    },{
        where: {id: req.params.id}
    })
    .then(() => {
        res.redirect('/teachers')
    })
})

router.get('/delete/:id', function(req, res){
    Teacher.destroy({
        where: { id:req.params.id }
    })
    .then(() => {
        res.redirect('/teachers')
    })
})



module.exports = router;