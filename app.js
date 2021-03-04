const express = require("express");
const app = express();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { authenticateToken } = require("./routes/authentication.js");
const routes = require("./routes/index-routes.js");


// Settings
app.set('port', process.env.PORT || 3000);


// Middlewares
app.use(helmet());
app.use(rateLimit({ windowMs: 60 * 60 * 1000, max: 5 }));
app.use(authenticateToken);
app.use(express.json());

routes.app()

//routes
require('./routes/index-routes.js');


// Start the server

app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'))
});

module.exports = app;
