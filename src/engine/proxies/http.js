'use strict';

let http   = require('http');
let https  = require('https');
let parse_url = require('url').parse;

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
    path: fullPath(target, parse_url(req.url).path)
  };

  return transport.request(targetReqOptions);
}

let responseHandler = options => {
  if (!options.envelope) throw new Error('response.evnvelope is required');

  let envelope = options.envelope;

  return envelope(payload => {
    for(let transformer of options.transformers || []){
      payload = transformer(payload);
    }
    return payload;
  });
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
      let handleResponse = responseHandler(options.response);
      handleResponse(targetRes, res);
    } else {
      // Just send everything to response
      // TODO: Copy headers
      targetRes.pipe(res);
    }

  });

  // Stream
  req.pipe(targetReq);

}
