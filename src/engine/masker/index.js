let maskers = {
  ssn: require('./values/ssn'),
  birthday: require('./values/birthday'),
  email: require('./values/email'),
  phone: require('./values/phone'),
}

let traverse = (o, func) => {
    for (let i in o) {
        o[i] = func(i, o[i]);
        if (o[i] !== null && typeof(o[i]) == 'object') {
            traverse(o[i], func);
        }
    }
}

let processRule = (value, rule) => {
  if (value && rule && rule.masker && rule.masker.type){
    let maskerType = rule.masker.type;
    if (maskers[maskerType]){
      let masker = maskers[maskerType];

      return masker(value, rule);
    }
  }
  return value;
}

module.exports = options => payload => {

  let body = payload.body || payload;
  let rules = options.rules || [];
  let matchers = {};
  for(let rule of rules) {
    matchers[rule.matcher] = rule;
  }

  let worker = (key, value) => {
    if (matchers[key]){
      return processRule(value, matchers[key]);
    }
    return value;
  }

  traverse(body, worker);

  return body;
}
