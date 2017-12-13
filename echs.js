'use strict';

const
  ps = require('process'),
  path = require('path'),
  http = require('http'),
  port = ps.env.ECHS_PORT || 3987;

http
  .createServer((req, res) => {

    res.end('Hello world!');

  })
  .listen(
    port,
    () => console.log('%s server listening on port %s...', path.basename(__filename, path.extname(__filename)), port)
  );
