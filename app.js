const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
// const models = require('./models');
const router = require('./routes');
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');


//route index
var routeIndex = require('./routes');
app.use('/', routeIndex);

//route student
var routeStudent = require('./routes/student');
app.use('/', routeStudent)

//route teacher
var routeTeacher = require('./routes/teacher');
app.use('/', routeTeacher)


app.listen(3000, () => console.log('Example app listening on port 3000!'))
