const os = require('os');
const ps = require('process');
const path = require('path');
const http = require('http');
const util = require('util');

const port = ps.env.BM_SERVER_PORT || 3987;
const srvHead = util.format(
  '%s/%s (%s)',
  ps.title.charAt(0).toUpperCase() + ps.title.slice(1),
  ps.version.replace(/[A-Za-z ]+/g, ''),
  os.type()
);
const verbose = util.format(
  '%s server listening on port %s (pid %s)...',
  path.basename(__filename, path.extname(__filename)),
  port,
  ps.pid
);

http
  .createServer((req, res) => {
    const message = 'Hello there! Who might you be -- Marian/Venom by any chance ;) ?';

    Object.entries({
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Length': Buffer.byteLength(message, 'utf8'),

      // see https://stackoverflow.com/a/4881279/272939
      Date: new Date().toUTCString(),
      // ? 'Connection': 'close',
      Server: srvHead,

      // No caching
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0', // HTTP 1.1
      Pragma: 'no-cache', // HTTP 1.0
      Expires: '0' // Proxies
    }).forEach(([headerName, headerValue]) => res.setHeader(headerName, headerValue));

    res.statusCode = 200;
    res.end(message);
  })
  .listen(port, () => verbose && console.log(verbose));
