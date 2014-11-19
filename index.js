var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var html = fs.readFileSync('index.html', 'utf8');

function handler(req, res) {
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Content-Length', Buffer.byteLength(html, 'utf8'));
	res.end(html);
}

function tick() {
	var now = new Date().toUTCString();
	io.sockets.send(now);
}

setInterval(tick, 1000);

var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port, function() {
	console.log('Server listening on %s.', port);
});