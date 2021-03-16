"use strict";

var express = require("express");

var app = express();

var helmet = require('helmet');

var rateLimit = require('express-rate-limit');

var _require = require("./routes/authentication.js"),
    authenticateToken = _require.authenticateToken;

var routes = require("./routes/index-routes.js"); // Settings


app.set('port', process.env.PORT || 3000); // Middlewares

app.use(helmet());
app.use(rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5
}));
app.use(authenticateToken);
app.use(express.json());
routes(app); //routes

require('./routes/index-routes.js'); // Start the server


app.listen(app.get('port'), function () {
  console.log('Server on port', app.get('port'));
});
module.exports = app;