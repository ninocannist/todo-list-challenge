var path = require('path');
var express = require('express');
const cors = require('cors');

var app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));
app.set('port', process.env.PORT || 8080);

var server = app.listen(app.get('port'), function () {
  console.log('listening on port ', server.address().port);
});
