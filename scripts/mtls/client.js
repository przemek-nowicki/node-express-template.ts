const https = require('https');
const fs = require('fs');
const { exit } = require('process');

// Config
const hostname = 'localhost';
const path = '/api/secure/test-data';
const port = 8080;
// Paths to files in the same folder
const keyPath = './client.key';
const certPath = './client.crt';

if (!fs.readFileSync(keyPath) || !fs.existsSync(certPath)) {
  console.error(
    'Key or cert file does no exist. Run generate_certificates.sh script to obtain files first',
  );
  exit(1);
}
// Options for the HTTPS request, including mTLS configuration
const options = {
  hostname,
  port,
  path,
  method: 'GET',
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
  rejectUnauthorized: false, // Is set to false becaue we use a self-signed certificate. On production this flag should be set to true.
};

console.log(
  `Attempt to call: https://${hostname}/${path}:${port} with client certificate and key`,
);

// Create the HTTPS request
const req = https.request(options, (res) => {
  console.log('SERVER RESPONSE');
  console.log(`STATUS: ${res.statusCode}`);
  res.setEncoding('utf8');

  res.on('data', (chunk) => {
    console.log('Response body:', chunk);
  });

  res.on('end', () => {
    console.log('--');
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end();
