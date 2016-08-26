'use strict';

let SwaggerExpress = require('swagger-express-mw');
let app = module.exports = require('express')();

SwaggerExpress.create({ appRoot: __dirname }, (err, swaggerExpress) => {
  if (err) { throw err; }

  swaggerExpress.register(app);

  app.listen(process.env.PORT || 10010);
});
