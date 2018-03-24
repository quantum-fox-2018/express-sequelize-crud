const model = require('../models');

class ControllerTeacher {
  static list() {
    return model.Teacher.findAll({
      order: [
        ['id', 'ASC']
      ]
    });
  }

  static findOne(id) {
    return model.Teacher.findById(id);
  }

  static add(obj) {
    let teacher = model.Teacher.build({
      first_name: obj.first_name,
      last_name: obj.last_name
    })
    return teacher.save();
  }

  static update(id, first_name, last_name, email) {
    return model.Teacher.findById(id)
    .then(function(teacher) {
      return teacher.update({
        first_name: first_name,
        last_name: last_name
      })
    })
    .catch(err => {
      console.log(err.message);
    });
  }

  static delete(id) {
    return model.Teacher.findById(id)
    .then(function(teacher) {
      return teacher.destroy()
    })
    .catch(err => {
      console.log(err.message);
    });
  }
}

module.exports = ControllerTeacher;
