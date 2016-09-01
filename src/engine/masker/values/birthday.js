let moment = require('moment');
let rnd = (min, max) => Math.floor(Math.random() * (max - min) + min);

let code = (value, salt) => {
    value += (salt || '')
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
        hash = ((hash<<5)-hash)+value.charCodeAt(i);
        hash = hash & hash;
    }
    return hash;
};

module.exports = (value, options) => {
  options = options || {};
  let range = (options.range || 60);
  let format = (options.format || 'YYYY-MM-DD');
  let delta = 0;
  if (options.sticky){
    delta = (code(value, options.salt)/range)-(range/2);
  } else {
    delta = rnd(-range/2, range/2);
  }

  return moment(value).add(delta, 'd').format(format);
}
