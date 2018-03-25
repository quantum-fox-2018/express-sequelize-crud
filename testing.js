const db = require('./models');

db.Student.create({
  firstName:"john",
  lastName:"doe",
  email:"johndoe@mail.com"
}).then(function(successRow){
  console.log(successRow);
})
