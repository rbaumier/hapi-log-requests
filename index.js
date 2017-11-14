'use strict';

const Hoek = require('hoek');

module.exports = (logger) => {
  return {
    register: (server, options) => {
      server.ext('onRequest', (request, h) => {
        request.plugins.elapsed = {
          bench: new Hoek.Bench()
        };
        return h.continue;
      });

      server.events.on('response', (request) => {
        logger.info({
          id: request.id,
          method: request.method,
          path: request.path,
          query: request.query,
          payload: request.payload,
          method: request.method.toUpperCase(),
          user: request.user,
          headers: request.headers,
          response: {
            msec: Math.round(request.plugins.elapsed.bench.elapsed()),
            status: request.response.statusCode,
            content: request.response.source
          }
        });
      });
    },
    pkg: require('./package.json')
  };
}
