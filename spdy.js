
/*!
 * Connect - SPDYServer
 * Copyright(c) 2010 Sencha Inc.
 * Copyright(c) 2011 TJ Holowaychuk
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var HTTPServer = require('connect').HTTPServer
  , spdy = require('spdy');

/**
 * Initialize a new `Server` with the given
 *`options` and `middleware`. The SPDY api
 * is identical to the HTTPS api, which
 * is identical to the [HTTP](http.html) server,
 * however TLS `options` must be provided before
 * passing in the optional middleware.
 *
 * @params {Object} options
 * @params {Array} middleawre
 * @return {Server}
 * @api public
 */

var Server = exports.Server = function SPDYServer(options, middleware) {
  this.stack = [];
  middleware.forEach(function(fn){
    this.use(fn);
  }, this);
  spdy.Server.call(this, options, this.handle);
};

/**
 * Inherit from `http.Server.prototype`.
 */

Server.prototype.__proto__ = spdy.Server.prototype;

// mixin HTTPServer methods

Object.keys(HTTPServer.prototype).forEach(function(method){
  Server.prototype[method] = HTTPServer.prototype[method];
});
