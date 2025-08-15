// server.js
const serverless = require('serverless-http');
const app = require('./app'); // requires the app we exported

module.exports = serverless(app);
