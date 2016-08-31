let zlib = require('zlib');
let concatStream = require('concat-stream');
let MemoryStream = require('memorystream');

module.exports.unpack = (req, next) => {

  let concat = concatStream(data => {

    try{
      req.body = JSON.parse(data.toString());
      next();
    } catch(ex) {
      console.log(ex);
      console.log('Data:');
      console.log(data.toString());
    }

  });

  req.pipe(concat);
};
