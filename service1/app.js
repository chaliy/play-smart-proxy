'use strict';

let SwaggerExpress = require('swagger-express-mw');
let app = module.exports = require('express')();

SwaggerExpress.create({ appRoot: __dirname }, (err, swaggerExpress) => {
  if (err) { throw err; }

  swaggerExpress.register(app);

  let port = process.env.PORT || 10010;
  app.listen(port, () => {
    console.log(`Service1 server listening on port ${port}`);
  });
});
