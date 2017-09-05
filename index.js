'use strict';

const Hoek = require('hoek');

module.exports = (logger) => {
  const register = (server, options, next) => {
    server.ext('onRequest', (request, reply) => {
      request.plugins.elapsed = {
        bench: new Hoek.Bench()
      };
      reply.continue();
    });

    server.on('response', (request, reply) => {
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

    next();
  };

  register.attributes = {
    pkg: require('./package.json')
  };

  return { register };
}
