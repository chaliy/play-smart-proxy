'use strict';

let util = require('util');
let http = require('http');
let httpProxy = require('http-proxy');
let app = require('connect')();
let replaceSSN = require('./src/transformations/dumbTextReplace')('ssn', 'nss');
//let replaceBirthday = require('./src/transformations/dumbTextReplace')('birthday', 'daybirth');

let transformEmployeeSSN = require('./src/transformations/json')(body => {
  for(let empl of body) {
    empl.ssn = 'xxx-xxxx-xxx';
  }

  //console.log(typeof(body));

  return body;
});

let proxy = httpProxy.createProxyServer({
  target: 'http://localhost:10010'
});

//proxy.on('proxyRes', transformEmployeeSSN);

//app.use(replaceSSN);
//app.use(replaceBirthday);
app.use('/employee', transformEmployeeSSN);

app.use((req, res) => proxy.web(req, res));
app.use((err, req, res, next) => {
  console.log(err);
  next(err);
});

// Host
let port = process.env.PORT || 10020;

http.createServer(app).listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
