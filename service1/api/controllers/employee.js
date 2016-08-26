let _ = require('lodash');
let employees = require('../../data/employees.json');

module.exports.list = (req, res, next) => {
  res.json(_.take(employees, 4));
}

module.exports.create = (req, res) => {
  res.json(`Hello world!`);
}
