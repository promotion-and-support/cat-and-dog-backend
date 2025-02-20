/* eslint-disable max-len */
const ngrok = require('@ngrok/ngrok');
const http = require('node:http');

async function startTunel(port) {
  const config = {
    proto: 'http', // http|tcp|tls, defaults to http
    addr: port, // port or network address, defaults to 80
    // basic_auth: 'user:pwd', // http basic authentication for tunnel
    // subdomain: 'alex', // reserved tunnel name https://alex.ngrok.io
    authtoken: '2VOQImOTAGmAZJZjFqLYeYFNfCr_3tXM3wtZ15aL8df74Q9CH', // your authtoken from ngrok.com
    region: 'eu', // one of ngrok regions (us, eu, au, ap, sa, jp, in), defaults to us
    // configPath: '~/git/project/ngrok.yml', // custom path for ngrok config file
    // binPath: path => path.replace('app.asar', 'app.asar.unpacked'), // custom binary path, eg for prod in electron
    // onStatusChange: status => {}, // 'closed' - connection is lost, 'connected' - reconnected
    // onLogEvent: console.log, // returns stdout messages from ngrok process
  };

  const listener = await ngrok.connect(config);
  const url = listener.url();

  return url;
}

const server = http.createServer(() => {
  console.log('REQUEST');
});

server.listen(3001, async () => {
  const url = await startTunel(8000);
  console.log(url);
});
