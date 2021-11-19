
const https = require('https');
const fs = require('fs');
const requests = require("./server/requests")
const hostname = '0.0.0.0';
const port = 443;

const options = {
  cert: fs.readFileSync('/root/cert.pem'),
  key: fs.readFileSync('/root/key.pem'),
  ca : fs.readFileSync('/root/ca.pem')
};

const server = https.createServer(options, (req, res) => {
  requests.processRequest(req, res);
}).listen(port);
