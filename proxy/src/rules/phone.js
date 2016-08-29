module.exports = value => {
  let index = value.length - 4;
  return value.substring(0, index).replace(/[0-9]/g, "x") + value.substring(index);
}
