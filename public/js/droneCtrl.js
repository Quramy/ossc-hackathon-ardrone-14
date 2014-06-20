'use strict';

var socket = io.connect('http://localhost:3000');
socket.on('connect', function(msg) {
	console.log("connet");
	//document.getElementById("connectId").innerHTML = "あなたの接続ID::" + socket.socket.transport.sessid;
	//document.getElementById("type").innerHTML = "接続方式::" + socket.socket.transport.name;
});

// メッセージを受けたとき
socket.on('message', function(msg) {
// メッセージを画面に表示する
	console.log(msg.value);
});

// メッセージを送る
function SendMsg() {
	var msg = document.getElementById("message").value;
	socket.emit('message', { value: msg });
}

function droneStart(command){
	socket.emit('drone', { type: 'takeoff' });
}

function droneStop(){
	socket.emit('drone', {type: 'stop'});
}

// 切断する
function DisConnect() {
	var msg = socket.socket.transport.sessid + "は切断しました。";
	// メッセージを発射する
	socket.emit('message', { value: msg });
	// socketを切断する
	socket.disconnect();
}
