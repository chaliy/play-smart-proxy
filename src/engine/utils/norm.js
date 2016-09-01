module.exports = input => {
  if (typeof(input) === 'function') {
    input = input();
  }

  return Promise.resolve(input);
}
