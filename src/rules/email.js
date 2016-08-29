module.exports = value => {
  let index = value.indexOf('@');

  return `xxxxxxx${value.substring(index)}`;
}
