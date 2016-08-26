'use strict';

let util = require('util');
let http = require('http');
let httpProxy = require('http-proxy');
let app = require('connect')();
let replace1 = require('./src/dumbTextReplace')('ssn', 'nss');
let replace2 = require('./src/dumbTextReplace')('birthday', 'daybirth');


let proxy = httpProxy.createProxyServer({
  target: 'http://localhost:10010'
});

app.use(replace1);
app.use(replace2);

app.use((req, res) => proxy.web(req, res));

http.createServer(app).listen(process.env.PORT || 10020);
