require('require-yaml');
let rules = require('./rules/employee.yaml');
let transform = require('./engine/transformer')(rules);

module.exports = transform;
