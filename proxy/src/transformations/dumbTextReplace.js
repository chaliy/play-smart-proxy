module.exports = (predicate, replace) => (req, res, next) => {
  let _write = res.write;

  res.write = data => {
    _write.call(res, data.toString().replace(predicate, replace));
  }
  next();
}
