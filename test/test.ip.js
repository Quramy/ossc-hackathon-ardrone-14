var arDrone = require('ar-drone');
var client = arDrone.createClient({ ip:"192.168.1.3"});

client.takeoff();

client
  .after(7000, function() {
    this.land();
  });

