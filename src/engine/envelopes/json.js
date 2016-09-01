let zlib = require('zlib');
let concatStream = require('concat-stream');
let MemoryStream = require('memorystream');

module.exports = modify => (targetRes, res) => {

  let contentEncoding = targetRes.headers['content-encoding'];

  let stream;
  switch (contentEncoding) {
    case 'gzip':
      stream = zlib.Gunzip();
      break;

    case 'deflate':
      stream = zlib.Inflate();
      break;

    default:
      stream = new MemoryStream();
  }

  let concat = concatStream(data => {

    try{
      let body = JSON.parse(data.toString());

      Promise
        .resolve(modify({
          body
        }))
        .then(result => {
          res.write(JSON.stringify(result));
          res.end();
        })
        .catch(console.log);


    } catch(ex) {
      console.log(ex);
      console.log('Data: ', data.toString());
    }

  });

  stream.pipe(concat);
  targetRes.pipe(stream);
};
