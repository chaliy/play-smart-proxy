let moment = require('moment');
let rnd = (min, max) => Math.floor(Math.random() * (max - min) + min);

module.exports = value => {
  return moment(value).add(rnd(-30, 30), 'd').format('YYYY-MM-DD');
}
