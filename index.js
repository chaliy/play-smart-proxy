'use strict';

let util = require('util');
let http = require('http');
let httpProxy = require('http-proxy');
let app = require('connect')();

let transformEmployee = require('./src/employee');

let proxy = httpProxy.createProxyServer({
  target: 'http://localhost:10010'
});

app.use('/employee', transformEmployee);

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