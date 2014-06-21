exports.execScript = function (client) {
	return function(req, res) {
		console.log('execScript');
		var name = req.param('name');
		var autoScript = require(name);
		autoScript.exec(client);
		res.writeHead(200, {
			"Content-Type" : "text/plain"
		});
	};
};
