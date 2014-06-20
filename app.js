
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var socketIO = require('socket.io');
var droneWrap = require('./droneWrap.js');
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
	app.locals.pretty = true;
});

app.get('/', routes.index);
app.get('/users', user.list);

/**
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
**/
server = http.createServer(app); // add


// クライアントの接続を待つ(IPアドレスとポート番号を結びつけます)
//var io = socketIO.listen(server);
//
// // クライアントが接続してきたときの処理
require('./socketCtrl.js')(socketIO.listen(server), droneWrap.createClient()); 


require("dronestream").listen(server);

server.listen(app.get('port'), function(){ //add
	console.log("Express server listening on port " + app.get('port'));
});
