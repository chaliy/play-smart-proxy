let ssn = require('./rules/ssn');
let birthday = require('./rules/birthday');
let email = require('./rules/email');
let phone = require('./rules/phone');

let mask = (empl, key, masker) => {
  if (empl[key]) {
    empl[key] = masker(empl[key]);
  }
}

let transformEmployee = require('./transformations/json')(body => {
  for(let empl of body) {
    mask(empl, 'ssn', ssn);
    mask(empl, 'birthday', birthday);
    mask(empl, 'email', email);
    mask(empl, 'phone', phone);
  }

  return body;
});

module.exports = transformEmployee;
