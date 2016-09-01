'use strict';

let http   = require('http');
let https  = require('https');
let parse_url = require('url').parse;
let waterfall = require('../utils/waterfall');

let forwardedHeaders = req => {
  return {}
}

let fullPath = (target, path) => {
  let targetPath = (target.path || '').replace(/\/$/, '');
  return `${targetPath}${path || ''}`;
}

let request = (req, options) => {

  let target = parse_url(options.target);

  let transport = (target.protocol === 'https:' ? https : http);
  let targetReqOptions = {
    port: target.port,
    hostname: target.hostname,
    protocol: target.protocol,
    method: req.method,
    headers: Object.assign({}, req.headers, forwardedHeaders(req), {
      host: target.host
    }),
    path: fullPath(target, parse_url(req.originalUrl).path)
  };

  return transport.request(targetReqOptions);
}

/**
 * @param {Object} options
 * @param {String} options.target Target URL  (e.g. http://example.com, http://example.com/example)
 * @param {String} options.response
 * @param {String} options.response.envelope Unpacker, see envelopes
 * @param {String} options.response.transformers Array of transoferms, see transoferms
 *
 * @example
 * proxy({
 *   traget: 'http://example.com',
 *   response: {
 *     envelope: json,
 *     transformers: [
 *       employee
 *     ]
 *   }
 * })
 */
module.exports = options => (req, res, next) => {

  let targetReq = request(req, options);

  let errorHandler = err => {
    targetReq.abort()
    console.log('Proxy Error: ', err);
  }

  req.on('aborted', errorHandler);
  req.on('error', errorHandler);
  targetReq.on('error', errorHandler);

  targetReq.on('response', targetRes => {

    if (options.response){
      let { envelope, transformers } = options.response;
      if (!envelope) throw new Error('options.response.envelope is required');

      let modify = payload => waterfall(transformers || [], payload);

      envelope(modify)(targetRes, res);

    } else {
      // Just send everything to response
      Object.keys(targetRes.headers).forEach((key) => {
        res.setHeader(key, targetRes.headers[key]);
      });
      res.writeHead(targetRes.statusCode);
      targetRes.pipe(res);
    }

  });

  // Stream
  req.pipe(targetReq);

}
