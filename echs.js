'use strict';

const
  http = require('http'),
  port = 8910;

http
  .createServer((req, res) => {

    res.end('Hello world!');

  })
  .listen(port, () => console.log('Server listening on: http://localhost:%s', port));
