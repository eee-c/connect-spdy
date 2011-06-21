var connectCreateServer = require('connect')
  , SPDYServer = require('./spdy').Server;

// Just like core connect,
// expose createServer() as the module

exports = module.exports = createServer;

function createServer() {
  if ('object' == typeof arguments[0]) {
    return new SPDYServer(arguments[0], Array.prototype.slice.call(arguments, 1));
  } else {
    return connectCreateServer(Array.prototype.slice.call(arguments));
  }
};

// support connect.createServer()

exports.createServer = createServer;

// expose constructor

exports.SPDYServer = SPDYServer;
