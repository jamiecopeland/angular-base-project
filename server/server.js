var express = require('express');

var port = process.env.PORT || 3000;

// --------------------------------------------------
// Express setup

var app = express();
app.use(express.static(__dirname + '/../deploy'));

// --------------------------------------------------
// Server startup

app.listen(port);
console.log('Point browser to: http://localhost:' + port);