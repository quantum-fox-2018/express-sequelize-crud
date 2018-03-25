'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
  Student.getStudents = function(cb){
    Student.findAll()
    .then(dataStudent => {
      cb(dataStudent)
    })
    .catch(err => {
      console.log(err)
    })
  }

  Student.addStudent = function(fname,lname,iemail,ca,ua){
    Student.create({
      first_name: fname,
      last_name: lname,
      email: iemail,
      createdAt: ca,
      updatedAt: ua
    })
    .then(data => {
      console.log(`${data} berhasil diinput`)
    })
    .catch(err => {
      console.log(err)
    })
  }

  };
  return Student;
};
