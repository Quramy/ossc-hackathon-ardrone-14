exports.execScript = function (client) {
	return function(req, res) {
		var name = req.param('name');
		console.log('execScript ' + './' + name);
		var autoScript = require('./'+name);
		autoScript.exec(client);
		res.writeHead(200, {
			"Content-Type" : "text/plain"
		});
		console.log('execScript');
		return res.end();
	};
};
