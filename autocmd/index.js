autocmd.index = function(client) {
	return function(req, res) {
		var name = req.param('name')
		var autoScript = require(name);
		autoScript(client);
		res.writeHead(200, {
			"Content-Type" : "text/plain"
		});
	};
};
