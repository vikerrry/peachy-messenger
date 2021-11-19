const fs = require("fs")
module.exports = {
	requestFile: function (path, query, data, response) {
		if (path == "/") {
			path = "/static/index.html"
		}
		path = "." + path;
		try {
			if (fs.existsSync(path)) {
				response.write(fs.readFileSync(path))
			} else {
				response.statusCode = 404;
			}
		} catch(err) {
			console.log(err);
		}
		response.end();
	},
};
