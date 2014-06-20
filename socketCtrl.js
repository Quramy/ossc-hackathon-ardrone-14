
var MOCK_MODE = true;
var arDrone = require('ar-drone');

module.exports = (function(){

	var commandExec = function(command){
	};

	var ctrl = function(socket){

		var client = (function(){
			if(!MOCK_MODE){
				return arDrone.createClient();
			}else{
				return {
					takeoff: function(){
						console.log('takeoff');
					},
					after: function(){
					}
				}
			}
		})();

		socket.on('drone', function(command) {
			console.log(command.type);
			if(command.type === 'takeoff'){
				client.takeoff();
			}else if(command.type === 'stop'){
			}
		});
	};

	return ctrl;
})();
