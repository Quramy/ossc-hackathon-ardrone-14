
var dgram = require('dgram');
var receiver = dgram.createSocket('udp4');
var MOCK_UDP_PORT = 13571;

console.log('port: ' + MOCK_UDP_PORT);
receiver.bind(MOCK_UDP_PORT);
