var base = {
	position: {
		x: 0,
		y: 400,
		z: 0
	}
}
var offset = 40
var counter = 0
var drone = { flying: false, y: 'steady', x: 'steady', z: 'steady' }

var skynetConfig = {
  "uuid": "1234567890",
  "token": "1234567890"
}    
skynet(skynetConfig, function (e, socket) {
// skynet(function (e, skynet) {
// skynet({appName:'chris'}, function (e, skynet) {
  if (e) throw e

  console.log("Connected to Skynet!");

	function doFrame(latestFrame){
		var $log = $("#log")
		$log.html("")
		counter++
		//$('#log').append(counter + '<br />')

		if(latestFrame.hands.length > 0){
			if(!drone.flying) {
	
	      socket.emit('message', {
	        "devices": "*",
	        "message": {
	        	"fly":"takeoff"
	      }}, function(data){
					console.log('takeoff: ' + data)
	      });         

				drone.flying = true
			}
			var hand = latestFrame.hands[0]

			//console.clear()
			//console.log(hand.direction)

			// move up/down
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
			}
			else {
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
			}
			
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

});	