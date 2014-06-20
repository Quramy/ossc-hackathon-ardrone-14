module.exports = (function(){

	var socketCtrl = function(io, client){
		
		io.sockets.on('connection', function(socket) {
			console.log("connection");

			socket.on('drone', function(command) {
				console.log(command.type);
				//console.log(client);
				if(command.type === 'takeoff'){
					client.takeoff();
				}else if(command.type === 'stop'){
					client.after(200, function(){
						this.stop();
						this.land();
					});
				}
			});

			socket.on('disconnect', function(){
				console.log("disconnect");
			});
		});

	};
	return socketCtrl;
})();
