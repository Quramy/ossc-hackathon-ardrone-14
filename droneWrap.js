var arDrone = require('ar-drone');
var dgram      = require('dgram');
var MOCK_MODE = true;
var MOCK_UDP_PORT = 13571;
var MOCK_TCP_PORT = 13572;



module.exports = {
	createClient: function(){
		if(!MOCK_MODE){
			return arDrone.createClient();
		}else{
			var receiver = dgram.createSocket('udp4', function(msg, rinfo){
				var msgTxt = msg.toString();
				if(!msgTxt.match(/,0,0,0,0,0/) && msgTxt.match(/AT\*/)){
					console.log(msgTxt);
				}
			});
			receiver.bind(MOCK_UDP_PORT);

			return arDrone.createClient({
				ip: '127.0.0.1',
				port: MOCK_UDP_PORT
			});

			/*
			return {
				after: function(){},
				takeoff: function(){},
				stop: function(){},
				up: function(){}
			};*/
		}
	}
};
