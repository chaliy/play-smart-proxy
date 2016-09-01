'use strict';

module.exports = (tasks, ...args) => {
  if (tasks.length === 0) {
    return Promise.resolve.apply(null, args);
  }
  let first = tasks[0].apply(null, args);
  return tasks.slice(1).reduce((acc, cb) => acc.then(cb), first);
}
