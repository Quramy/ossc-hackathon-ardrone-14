var recognition = new webkitSpeechRecognition();
//recognition.lang = 'ja-JP'
//recognition.lang = 'en-EN'
recognition.lang = 'en-US';

// 話し声の認識中
recognition.onsoundstart = function() {
	console.log('onsoundstart!');
	$('#speech').text('認識中');
};
// マッチする認識が無い
recognition.onnomatch = function() {
	$('#speech').text('もう一度試してください');
};
// エラー
recognition.onerror = function() {
	$('#speech').text('エラー');
};
// 話し声の認識終了
recognition.onsoundend = function() {
	$('#speech').text('停止中');
};
// 認識が終了したときのイベント
// recognition.onresult = function(event) {
// var results = event.results;
// for (var i = event.resultIndex; i < results.length; i++) {
// $('#recognizedText').text(results[i][0].transcript);
// }
// };
//recognition.interimResults = true;
recognition.continuous = true
recognition.onresult = function(event) {
	var results = event.results;
	for (var i = event.resultIndex; i < results.length; i++) {
		// 認識の最終結果
		if (results[i].isFinal) {
			console.log(results[i][0].transcript);
			$('#speech').text(results[i][0].transcript);
		}
		// 認識の中間結果
//		else {
//			$('#recognizedText').text(results[i][0].transcript);
//		}
	}
};