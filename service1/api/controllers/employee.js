let employees = require('../../data/employees.json');

module.exports.list = (req, res, next) => {
  res.json(employees);
}

module.exports.create = (req, res) => {
  res.json(`Hello world!`);
}
