'use strict';

let util = require('util');
let http = require('http');
let httpProxy = require('http-proxy');
let app = require('connect')();

let proxy = httpProxy.createProxyServer({
  target: 'http://localhost:10010'
});

app.use((req, res, next) => {
  let _write = res.write;

  res.write = data => {
    // Muhaha!
    _write.call(res, data.toString().replace('ssn', 'nss'));
  }
  next();
});

app.use((req, res) => proxy.web(req, res));

http.createServer(app).listen(process.env.PORT || 10020);
