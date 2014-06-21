
var clientLeap = function(Leap, faye){

	var base = {
		position: {
			x: 0,
			y: 200,
			z: 0
		}
	};

	var offset = 40;
	var pausedFrame = null, latestFrame = null;

	var drone = { flying: false, y: 'steady', x: 'steady', z: 'steady' }
	var counter = 0;

	var socket = {
		emit: function(){}
	}

	var valid = false;
	var isLanding = false;

	function doFrame(latestFrame){
		var $log = $("#log");
		counter++;
			//$('#log').append(counter + '<br />')

	  if(latestFrame.hands.length === 0){
			if(valid){
				valid = false;
				$log.text('No hands');
				faye.publish("/drone/drone", {
					action : 'stop'
				});
				console.log('stop');
			}
			return;
		}else{
			valid = true;
		}
		$log.html("");
		if(latestFrame.hands.length > 1){
			if(!isLanding){
				isLanding = true;
				$log.html("Land!");
				console.log('landing!');
				faye.publish("/drone/drone", {
					action : 'land',
					speed : 0.3,
					duration : 1000 * parseInt($("#duration").val())
				});
				setTimeout(function(){
					isLanding = false;
				},3000);
			}
		}
		if(isLanding){
			$log.html("Landing...");
			return;
		}
		if(latestFrame.hands.length > 0){
			/**
			if(!drone.flying) {

				socket.emit('message', {
					"devices": "*",
					"message": {
						"fly":"takeoff"
					}}, function(data){
						console.log('takeoff: ' + data)
					});         

					drone.flying = true
			}**/
			var hand = latestFrame.hands[0];

			//console.clear()
			//console.log(hand.direction)

			// move up/down
			/*
			if(hand.palmPosition[1] > base.position.y  + offset) {
				$log.append('up' + '<br />')
				if(drone.y != 'up') {
					drone.y = 'up'
					socket.emit('message', {
						"devices": "*",
						"message": {
							"fly":"yaxis",
							"y":"up"
						}}, function(data){
							console.log('up: ' + data)
						});         

				}
			} else if(hand.palmPosition[1] < base.position.y  - offset) {
				$log.append('down' + '<br />')
				if(drone.y != 'down') {
					drone.y = 'down'
					socket.emit('message', {
						"devices": "*",
						"message": {
							"fly":"yaxis",
							"y":"down"
						}}, function(data){
							console.log('down: ' + data)
						});         
				}
			}*/
			/**
			} else {
				if(drone.y != 'steady') {
					drone.y = 'steady'
					socket.emit('message', {
						"devices": "*",
						"message": {
							"fly":"yaxis",
							"y":"steady"
						}}, function(data){
							console.log('steady: ' + data)
						});         
				}
			}

			// move right/left
			if(hand.palmPosition[0] > base.position.x  + offset) {
				$log.append('right' + '<br />')
				if(drone.x != 'right') {
					drone.x = 'right'
					socket.emit('message', {
						"devices": "*",
						"message": {
							"fly":"xaxis",
							"x":"right"
						}}, function(data){
							console.log('right: ' + data)
						});         
				}
			} else if(hand.palmPosition[0] < base.position.x  - offset) {
				$log.append('left' + '<br />')
				if(drone.x != 'left') {
					drone.x = 'left'
					socket.emit('message', {
						"devices": "*",
						"message": {
							"fly":"xaxis",
							"x":"left"
						}}, function(data){
							console.log('left: ' + data)
						});         
				}
			} else {
				if(drone.x != 'steady') {
					drone.x = 'steady'
					socket.emit('message', {
						"devices": "*",
						"message": {
							"fly":"xaxis",
							"x":"steady"
						}}, function(data){
							console.log('steady: ' + data)
						});         
				}
			}

			// move right/left
			if(hand.palmPosition[2] > base.position.z  + offset) {
				$log.append('backward' + '<br />')
				if(drone.z != 'back') {
					drone.z = 'back'
					socket.emit('message', {
						"devices": "*",
						"message": {
							"fly":"zaxis",
							"z":"back"
						}}, function(data){
							console.log('back: ' + data)
						});         
				}
			} else if(hand.palmPosition[2] < base.position.z  - offset) {
				$log.append('forward' + '<br />')
				if(drone.z != 'front') {
					drone.z = 'front'
					socket.emit('message', {
						"devices": "*",
						"message": {
							"fly":"zaxis",
							"z":"front"
						}}, function(data){
							console.log('front: ' + data)
						});         
				}
			} else {
				if(drone.z != 'steady') {
					drone.z = 'steady'
					socket.emit('message', {
						"devices": "*",
						"message": {
							"fly":"zaxis",
							"z":"steady"
						}}, function(data){
							console.log('steady: ' + data)
						});         
				}
			}*/


			if(latestFrame.gestures > 0) {
				console.log(latestFrame.gestures)
			}

		} else {
			if(drone.flying) {

				socket.emit('message', {
					"devices": "*",
					"message": {
						"fly":"land"
					}}, function(data){
						console.log('land: ' + data)
					});         

					drone.flying = false
			}
			$log.append('landing' + '<br />')
		}

		if($log.html() == '') {
			$log.append('steady' + '<br />')
		}
	}

	var controller = new Leap.Controller({enableGestures: true});
	controller.loop(function(frame) {
		latestFrame = frame
		//document.getElementById('out').innerHTML = (pausedFrame ? "<p><b>PAUSED</b></p>" : "") + "<div>"+(pausedFrame || latestFrame).dump()+"</div>"
		doFrame(pausedFrame || latestFrame)
	})

	controller.on('ready', function() {
		console.log("ready")
	})

	controller.on('connect', function() {
		console.log("connect")
	})

	controller.on('disconnect', function() {
		console.log("disconnect")
	})

	controller.on('focus', function() {
		console.log("focus")
	})

	controller.on('blur', function() {
		console.log("blur")
	})

	controller.on('deviceConnected', function() {
		console.log("deviceConnected")
	})

	controller.on('deviceDisconnected', function() {
		console.log("deviceDisconnected")
	});
};

$(function(){
	$('body').append($('<h1 id="log">'));
});
