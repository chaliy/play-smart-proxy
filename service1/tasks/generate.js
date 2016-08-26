'use strict';

let faker = require('faker');
let moment = require('moment');
let writeJson = require('jsonfile').writeFileSync;
let rnd = (min, max) => Math.floor(Math.random() * (max - min) + min);
let range = max => Array(max).fill();
let lpad = (number, digits) => ('00000000000000000000000'+number).slice(-digits);
let fakeSsn = () => `${lpad(rnd(0,999), 3)}-${lpad(rnd(0,999), 4)}-${lpad(rnd(0,9999), 4)}`;
let rndToBe = () => (rnd(0, 10000)/10000)>0.5;
let rndMoreToBe = () => (rnd(0, 10000)/10000)>0.2;

let generate = () => {
  let birthday = faker.date.between(new Date('1960-01-01'), new Date('1997-01-01'));
  let age = moment().diff(birthday, 'years');

  return {
      ssn: fakeSsn(),
      birthday: moment(birthday).format('YYYY-MM-DD'),
      age,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      avatar: faker.image.avatar(),
      email: faker.internet.email()
    };
};

//console.log(generate());

writeJson(`${__dirname}/../data/employees.json`,
  range(100).map(() => generate()),
  { spaces: 2 });
