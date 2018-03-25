var express = require('express')
var app = express()
// const bodyParser = require('body-parser')

// app.set('view engine', 'ejs')
// app.use(bodyParser.urlencoded({extended:false}))

app.get('/teachers', function(req, res) {

    res.send('menampilkan semua data teacher')
})

app.get('/teachers/add', function(req, res) {

    res.send('menampilkan form input saja')
})

app.post('/teachers/add', function(req, res) {

    res.send('meng-handle input dari form')
})

app.get('/teachers/edit', function(req, res) {

    res.send('menampilkan form data student bedasarkan ID')
})

app.post('/teachers/edit', function(req, res) {

    res.send('meng-handle input dari form saat update')
})

app.get('teachers/delete', function(req, res) {

    res.send('men-delete data berdasarkan id')
})

app.listen(2000)