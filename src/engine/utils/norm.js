module.exports = input => {
  if (typeof(input) === 'Function') {
    input = input();
  }

  return Promise.resolve(input);
}
