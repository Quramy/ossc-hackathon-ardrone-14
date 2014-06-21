exports.exec = function (client) {
	console.log('sample.js.exec');
	client.takeoff();

	client.after(5000, function() {
		this.clockwise(0.5);
	}).after(5000, function() {
		this.stop();
	}).after(5000, function() {
		this.clockwise(0.5);
	}).after(5000, function() {
		this.stop();
	}).after(1000, function() {
		this.stop();
		this.land();
	});
	return;
};