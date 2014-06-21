(function() {
  var startTime = new Date().getTime();

  var time = function(){
    return new Date().getTime() - startTime;
  }

  var app, currentImg, drone, express, faye, imageSendingPaused, path, server, socket;
  express = require("express");
  faye = require("faye");
  path = require("path");
  drone = require("ar-drone").createClient();
  drone.config('general:navdata_demo', 'TRUE');
  app = express();
  app.configure(function() {
    app.set('port', process.env.PORT || 3001);
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    return app.use("/components", express.static(path.join(__dirname, '/bower_components')));
  });
  server = require("http").createServer(app);
  new faye.NodeAdapter({
    mount: '/faye',
    timeout: 45
  }).attach(server);
  socket = new faye.Client("http://localhost:" + (app.get("port")) + "/faye");
  socket.subscribe("/drone/move", function(cmd) {
    var _name;
    console.log({name:"move", cmd:cmd , time:time()});

    return typeof drone[_name = cmd.action] === "function" ? drone[_name](cmd.speed) : void 0;
  });
  socket.subscribe("/drone/animate", function(cmd) {
    // console.log('animate', cmd);
    console.log({name:"animate", cmd:cmd , time:time()});

    return drone.animate(cmd.action, cmd.duration);
  });
  socket.subscribe("/drone/drone", function(cmd) {
    var _name;
    // console.log('drone command: ', cmd);
    console.log({name:"drone", cmd:cmd , time:time()});

    return typeof drone[_name = cmd.action] === "function" ? drone[_name]() : void 0;
  });
  server.listen(app.get("port"), function() {
    return console.log("Express server listening on port " + app.get("port"));
  });
  currentImg = null;
  drone.on('navdata', function(data) {
    return socket.publish("/drone/navdata", data);
  });
  imageSendingPaused = false;
  drone.createPngStream().on("data", function(frame) {
    currentImg = frame;
    if (imageSendingPaused) {
      return;
    }
    socket.publish("/drone/image", "/image/" + (Math.random()));
    imageSendingPaused = true;
    return setTimeout((function() {
      return imageSendingPaused = false;
    }), 100);
  });
  app.get("/image/:id", function(req, res) {
    res.writeHead(200, {
      "Content-Type": "image/png"
    });
    return res.end(currentImg, "binary");
  });
}).call(this);
