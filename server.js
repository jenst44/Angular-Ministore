var express = require('express');
var app = express();

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
	res.render('index');
})

app.listen('4444', function() {
	console.log('Mini store!');
})