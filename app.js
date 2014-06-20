
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

/**
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
**/
server = http.createServer(app); // add
server.listen(app.get('port'), function(){ //add
	console.log("Express server listening on port " + app.get('port'));
});

var socketIO = require('socket.io');
// クライアントの接続を待つ(IPアドレスとポート番号を結びつけます)
var io = socketIO.listen(server);
//
// // クライアントが接続してきたときの処理
var ctrl = require('./socketCtrl.js');
io.sockets.on('connection', function(socket) {
	console.log("connection");
	// メッセージを受けたときの処理
	socket.on('message', function(data) {
		// つながっているクライアント全員に送信
		console.log("message");
		io.sockets.emit('message', { value: data.value });
	});

	ctrl(socket);

	// クライアントが切断したときの処理
	socket.on('disconnect', function(){
		console.log("disconnect");
	});
});
