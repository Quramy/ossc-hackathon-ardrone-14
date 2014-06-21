var express = require('express')
  , routes = require('./routes')
  , app = express()
  , path = require('path')
  , server = require("http").createServer(app)
  ;

var arDrone = require('ar-drone');
var client = arDrone.createClient();
client.disableEmergency();


app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade', { pretty: true });
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
    app.locals.pretty = true;
});

app.get('/', routes.index);

app.get('/takeoff',function(req,res){
  res.send('takeoff');
  client.takeoff();

  client.after(5000, function() {
    this.clockwise(0.5);
  });

});

app.get('/stop',function(req,res){
  res.send('stop');
  client
    .after(0, function() {
      this.stop();
      this.land();
    });
});

client.on('navdata',function(data){
  console.log('navdata',data);
});

client.on('lowBattery',function(data){
  console.log('lowBattery',data);
});

client.on('batteryChange',function(data){
  console.log('batteryChange',data);
});

client.on('altitudeChange',function(data){
  console.log('altitudeChange',data);
});

client.on('landing',function(data){
  console.log('landing',data);
});

client.on('landed',function(data){
  console.log('landed',data);
});

client.on('takeoff',function(data){
  console.log('takeoff',data);
});

client.on('flying',function(data){
  console.log('flying',data);
});

client.on('takeoff',function(data){
  console.log('takeoff',data);
});


require("dronestream").listen(server);
server.listen(3000);
