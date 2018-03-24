const express = require('express');
const app = express();
const db = require('./models');
const bodyParser = require('body-parser')


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}))


app.get('/', function(req, res) {
  res.render('index');
})

//Students
app.get('/students', function(req, res){
  db.Student.findAll()
  .then(Students =>{
      console.log(Students);
      res.render('students', {data:Students})
  })
  .catch(err =>{
      res.render('students', err)
  })

})


app.get('/students/add', function(req, res){
  res.render('students/addStudent')
})

app.get('/students/edit', function(req, res){
  res.render('students/editStudent')
})

app.get('/students/delete', function(req, res){
  res.render('students/deleteStudent')
})


//Teachers
app.get('/teachers', function(req, res){
  db.Teacher.findAll()
  .then(Teachers =>{
    // console.log(Teachers);
    res.render('teachers', {Teachers:Teachers, alert:''})
    // res.send(Teachers);
  })
  .catch(err =>{
    res.render('teachers', {Teachers:err, alert:''})
  })

})

app.get('/teachers/add', function (req, res){
  res.render('teachers/addTeacher')
})

app.post('/teachers/allertAdd', function(req, res){
  db.Teacher.create(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      createdAt: new Date(),
      updateAt: new Date()
    }
  )
  .then(Results =>{
    let alert = `${Results.first_name} has been added`
    console.log(alert);
    res.render('teachers/addResult', {alert:alert})
  })
  .catch(err =>{
    // alert(err)
    res.render('teachers/addResult', {alert:err})
    // res.render('teachers', {Teachers:err, alert:alert})
  })
})

//edit
app.get('/teachers/edit/:teachersId', function(req, res){
  // console.log(req.params.teachersId);
  let teacher_id = req.params.teachersId;
  db.Teacher.findOne({where:{id:teacher_id}})
  .then(teachersData =>{
    // console.log(teachersData);
    res.render('teachers/editTeacher', {teachersData})
  })
  .catch(err =>{
    // console.log(err);
  })
})

app.post('/teachers/editResult/:teachersId', function(req, res){
  let teacherUpdateData = req.body;
  db.Teacher.update(teacherUpdateData,
  {
    where:{id:req.params.teachersId}
  })
  .then(Results =>{
      console.log(Results);
      if(Results[0] == 1){
        //update berhasil
        console.log('Data SuccesFully updated');
        res.render('teachers/editResult');
      }else{
        //update gagal
      }

  }
  )
  .catch(err =>{
      console.log(err);
  })

})

app.get('/teachers/delete/:teachersId', function(req, res){
  let teacher_id = req.params.teachersId;
  // console.log(teacher_id);
  db.Teacher.destroy({where:{id:teacher_id}})
  .then(results =>{
    // console.log(teachersData);
    res.render('teachers/deleteTeacher', {teacher_id})
  })
  .catch(err =>{
    // console.log(err);
  })

})




app.listen(3000, function(){
  console.log('Server Started on port 3000');
})














//
