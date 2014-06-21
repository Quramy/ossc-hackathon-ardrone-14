
/*
 * GET home page.
 */

exports.index = function(req, res){
	var name = req.param('name')
	// var autoScript = require(name);
	//
	res.writeHead(200, {
		"Content-Type": "text/plain"
	});
};
