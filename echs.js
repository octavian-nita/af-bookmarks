'use strict';

const
  os = require('os'),
  ps = require('process'),
  path = require('path'),
  http = require('http'),
  util = require('util'),
  port = ps.env.ECHS_PORT || 3987,
  server = util.format('%s/%s (%s)', ps.title.charAt(0).toUpperCase() + ps.title.slice(1),
                       ps.version.replace(/[A-Za-z ]+/g, ''), os.type());

http
  .createServer((req, res) => {
    const message = 'Hello there! Who might you be -- Marian/Venom by any chance ;) ?';

    Object.entries({

      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Length': Buffer.byteLength(message, 'utf8'),

      // see https://stackoverflow.com/a/4881279/272939
      'Date': new Date().toUTCString(),
      //? 'Connection': 'close',
      'Server': server,

      // No caching
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0', // HTTP 1.1
      'Pragma': 'no-cache',                                              // HTTP 1.0
      'Expires': '0'                                                     // Proxies

    }).forEach(([headerName, headerValue]) => res.setHeader(headerName, headerValue));

    res.statusCode = 200;
    res.end(message);
  })
  .listen(port, () => console.log('%s server listening on port %s (pid %s)...',
                                  path.basename(__filename, path.extname(__filename)), port, ps.pid));
