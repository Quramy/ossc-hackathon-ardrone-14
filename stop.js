var arDrone = require('ar-drone');
var client = arDrone.createClient();
// client.disableEmergency();

// client.takeoff();

client
  // .after(1000, function() {
  //   this.clockwise(0.5);
  // })
  .after(1000, function() {
    this.stop();
    this.land();
  });

