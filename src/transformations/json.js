let zlib = require('zlib');
let concatStream = require('concat-stream');
let MemoryStream = require('memorystream');

module.exports = (modify) => (req, res, next) => {

  if (req.method !== 'GET'){
    return next();
  }

  console.log(req);
  console.log(res);

  let _write      = res.write;
  let _end        = res.end;
  let _writeHead  = res.writeHead;

  let contentType;
  let contentEncoding;

  let gunzip = zlib.Gunzip();
  let stream = new MemoryStream();

  res.writeHead = (code, headers) => {
    contentType = res.getHeader('content-type');
    contentEncoding = res.getHeader('content-encoding');


    res.removeHeader('Content-Length');
    if (headers) {
      delete headers['content-length'];
    }

    res.removeHeader('Content-Encoding');
    if (headers) {
        delete headers['content-encoding'];
    }

    _writeHead.call(res, code, headers);
  };

  res.write = (data, encoding) => {
    if (contentEncoding === 'gzip') {
      gunzip.write(data);
    } else {
      stream.write(data);
    }
  };

  res.end = function (data, encoding) {
    if (contentEncoding === 'gzip') {
      gunzip.end(data);
    } else {
      stream.end(data);
    }
  };

  let concatWrite = concatStream(data => {

    try{
      let body = JSON.parse(data.toString());
      body = modify(body, req);

      _write.call(res, JSON.stringify(body));
      _end.call(res);
      return;
    } catch(ex) {
      console.log(ex);
      console.log(data.toString());
    }

    _write.call(res, data);
    _end.call(res);

  });


  gunzip.pipe(concatWrite);
  stream.pipe(concatWrite);

  next();
};
