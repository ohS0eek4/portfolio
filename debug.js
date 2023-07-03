var express = require('express');
var app = express();
app.use(express.static(__dirname+'/docs'));
app.get('/', function (req, res) {
  res.sendFile(__dirname+'/docs/index.html');
});
app.listen(3000, ()=>console.log(`Listening on port 8083`));