let transformers = {
  ssn: require('./transformers/ssn'),
  birthday: require('./transformers/birthday'),
  email: require('./transformers/email'),
  phone: require('./transformers/phone'),
}

let traverse = (o, func) => {
    for (let i in o) {
        o[i] = func(i, o[i]);
        if (o[i] !== null && typeof(o[i])=="object") {
            traverse(o[i], func);
        }
    }
}

let processRule = (value, rule) => {
  if (value && rule && rule.transformer && rule.transformer.type){
    let transformerType = rule.transformer.type;
    if (transformers[transformerType]){
      let transformer = transformers[transformerType];

      return transformer(value, rule);
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
